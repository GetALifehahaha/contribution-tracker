from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Contributor, Contribution

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        # hahaaha
        user = User.objects.create_user(**validated_data)
        return user

class ContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contributor
        fields = ['id', 'first_name', 'last_name', 'leader']
        extra_kwargs = {'leader': {'read_only': True}}


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = ['id', 'amount', 'date_of_contribution', 'date_paid', 'is_paid', 'contributor']
        extra_kwargs = {'contributor': {'read_only': True}}