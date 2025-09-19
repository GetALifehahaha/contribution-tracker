from django.shortcuts import render
from django.contrib.auth.models import User
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
    

class ContributionListCreate(generics.ListCreateAPIView):
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Contribution.objects.filter(contributor__leader=user)

