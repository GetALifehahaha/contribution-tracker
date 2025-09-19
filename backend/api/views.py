from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import generics
from .serializers import UserSerializer, ContributorSerializer, ContributionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
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
        return Contribution.objects.filter(contributor__leader=user)
    
    def perform_create(self, serializer):
        # serializer.validated_data is a dictionary, with contributor and amount key
        contributor = serializer.validated_data.get('contributor')

        # prevent multiple contributions per day
        # if so, return

        # get the amount in the dictionary, then add it to the contributor balance
        contributor.balance += serializer.validated_data.get('amount')
        contributor.save()
        serializer.save()


