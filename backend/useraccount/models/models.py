import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from useraccount.manager.manager import UserAccountsManager
from rest_framework_simplejwt.tokens import RefreshToken

class TafUserAccountsModel(AbstractBaseUser):
    user_account_id = models.UUIDField(db_index=True, default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    profile_pic = models.ImageField(upload_to='images/', null=True, blank=True)
    username = models.CharField(verbose_name="Username", max_length=255, unique=True)
    password = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=254, unique=True)
    account_created_at = models.DateTimeField(auto_now_add=True)
    account_modified_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)  # does the instance can login
    is_active = models.BooleanField(default=True)  # simple user in the system application
    is_superuser = models.BooleanField(default=True) # a super or admin user 


    objects = UserAccountsManager()

    USERNAME_FIELD = 'username'  # user identification field
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']  # required field


    def __str__(self):
        return f"{self.first_name} {self.last_name}- {self.username}"
    
    @property
    def get_full_account_name(self):
        return f"{self.first_name} {self.last_name}"

         
    def set_password(self, raw_password):
        self._plain_password = raw_password  # Store plain password temporarily
        super().set_password(raw_password)  # Hash and set the password

    def has_perm(self, perm, obj=None):
        # Simplistic permission check: superuser has all permissions
        return self.is_superuser

    def has_module_perms(self, app_label):
        # Simplistic permission check: superuser has all module permissions
        return self.is_superuser


    class Meta:
        ordering = ['username']
        app_label = 'useraccount'
        verbose_name = "User_account"
        db_table = "User"


    def get_token_for_taf_user(self): # generate a token for the user 
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        