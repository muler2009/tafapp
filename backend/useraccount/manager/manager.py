from django.contrib.auth.base_user import BaseUserManager
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.conf import settings

# UserAccountsModel = get_user_model()
class UserAccountsManager(BaseUserManager):
    
    def create_user(self, username, first_name, last_name, email, password, **extra_fields):
        if not email:
            raise ValueError("Email must be provided before proceeding")
        email = self.normalize_email(email)
        email = email.lower()
        user_instance = self.model(
            email=email, 
            username=username, 
            first_name=first_name, 
            last_name=last_name, 
            **extra_fields
        )
            
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        user_instance.set_password(password)
        user_instance.save(using=self._db)

        return user_instance
    
    def create_superuser(self, email, username, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must set the staff.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have superuser=True.')

        # user_dn = self.create_user_in_ldap(username, first_name, last_name, email, password)
        user = self.create_user(username, first_name, last_name, email, password, **extra_fields)
        # , user_dn
        return user