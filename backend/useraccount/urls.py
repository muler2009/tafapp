from django.urls import path
from useraccount.views.authenticate_user import AuthenticationRequestHandler
from useraccount.views.logout_request_handler import UserLogoutRequestHandler
from useraccount.views.change_password_request_handler import ChangeUserPasswordRequestHandler

app_name = 'useraccount'

urlpatterns = [
    path('login/', AuthenticationRequestHandler.as_view(), name='taf-user-login'),
    path('logout/', UserLogoutRequestHandler.as_view(), name='taf-user-logout'),
    path('change-password/', ChangeUserPasswordRequestHandler.as_view(), name='change-password'),
]