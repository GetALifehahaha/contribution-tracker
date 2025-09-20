from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import generics
from .serializers import UserSerializer, ContributorSerializer, ContributionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from .models import Contributor, Contribution

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ContributorListCreate(generics.ListCreateAPIView):
    serializer_class = ContributorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Contributor.objects.filter(leader=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(leader=self.request.user)
    

class ContributionListCreate(generics.ListCreateAPIView):
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # only show contributions per contributor
        contributor_id = self.kwargs['pk']
        return Contribution.objects.filter(contributor__leader=user, contributor_id=contributor_id)
    
    def perform_create(self, serializer):
        contributor_id = self.kwargs['pk']

        # serializer.validated_data is a dictionary, with contributor and amount key
        contributor =Contributor.objects.get(pk=contributor_id, contributor__leader=self.request.user)

        # prevent multiple contributions per day
        today = timezone.now().date()
        # check if the contributor already has its own contribution for today
        if Contribution.objects.filter(contributor=contributor, date_of_contribution=today).exists():
            # if so, stop the request and send a json file using 'details' key
            raise ValidationError("A contribution is already prepared")
        

        # get the amount in the dictionary, then add it to the contributor balance
        contributor.balance += serializer.validated_data.get('amount', 0)
        contributor.save()
        
        serializer.save(contributor=contributor)


