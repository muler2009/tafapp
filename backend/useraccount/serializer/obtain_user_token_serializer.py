from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import serializers
from ..models.models import TafUserAccountsModel
from exceptions.exceptions import AuthenticationFailedException
from django.contrib.auth import authenticate


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        if not user:
            raise AuthenticationFailed('User is not available', code='authentication_failed')
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
class LoginUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 255, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access = serializers.CharField(max_length=255, read_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)
    is_active = serializers.BooleanField(read_only=True)

    class Meta:
        model = TafUserAccountsModel
        fields = ['username', 'password', 'full_name', 'access', 'refresh', 'is_active' ]

    
    def validate(self, attrs):
        username = attrs.get('username')  # Get the username
        password = attrs.get('password')  # get the password
        request = self.context.get('request')

        user = authenticate(request, username=username, password=password)
        if not user: # if the user with the creintial not exsis
            raise serializers.ValidationError("Failed to Login, either username or password not correct, Try again!")


        user_token = user.get_token_for_taf_user()
        
        return {
            "username": user.username,
            "full_name": user.get_full_account_name,
            "access": user_token.get('access'),
            "refresh": user_token.get("refresh"),
            "is_active": user.is_active,
        }


