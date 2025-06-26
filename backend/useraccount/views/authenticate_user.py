from rest_framework import permissions, status, views, serializers, generics, mixins
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializer.obtain_user_token_serializer import LoginUserSerializer
from rest_framework.request import Request
from exceptions.exceptions import AuthenticationFailedException

class AuthenticationRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    permission_classes = [permissions.AllowAny]  
    serializer_class = LoginUserSerializer

    def post(self, request: Request, *args, **kwargs):
        user_serializer = self.serializer_class(data=request.data, context={'request': request})
        # user_serializer.is_valid(raise_exception=True)
        try: 
            if not user_serializer.is_valid():
                # raise AuthenticationFailedException(message="User with credentials not Found!", error_type="Authentication Error")
                raise AuthenticationFailedException(
                    message=user_serializer.errors, error_type="Login Failed!", status_code=400
                )
            
            return Response(user_serializer.data, status=status.HTTP_200_OK)

        except AuthenticationFailedException as exception:
            return Response({
                "message": str(exception.message),  # Ensure message is string
                "error_type": str(exception.error_type),  # Ensure error_type is string
                "status_code": exception.status_code
            }, status=status.HTTP_400_BAD_REQUEST)
        
      
        
        
    
          

        

























    # def post(self, request, *args, **kwargs):
    #     # username = request.data.get('username')
    #     # password = request.data.get('password')

    #     try:
    #         # ldap_backend = LDAPBackend()
    #         # user = ldap_backend.authenticate(request, username=username, password=password)   
    #         if user is not None:
    #             serializer = self.serializer_class(data = request.data, context={"request": request})
    #             token_data = serializer.get_token(user)
                
    #             # Extract the access and refresh data from the RefreshToken object
    #             access_token = str(token_data.access_token)
    #             refresh_token = str(token_data)
    #             user = user
                
    #             response_data = {
    #                 'access': access_token,
    #                 'refresh': refresh_token,     
    #                 "user": username
    #             }
    
    #             return Response(response_data, status=status.HTTP_200_OK)
    #         else:
    #             raise AuthenticationFailedException(message="User with credentials not Found!", error_type="Authentication Error")                
    #     except AuthenticationFailedException as exc:
    #         AUTH_REPLY = {
    #             'error_type'.upper(): exc.error_type,
    #             'Message'.upper(): exc.message,
    #             'status_code'.upper(): exc.status_code 
    #         }
    #         return Response(AUTH_REPLY, status=status.HTTP_400_BAD_REQUEST)
    #     except ldap.INVALID_CREDENTIALS:
    #         # logger.warning(f"Invalid credentials for username: {username}")
    #         return Response({'error': 'Invalid credentials with the useran'}, status=status.HTTP_401_UNAUTHORIZED)

    #     except ldap.LDAPError as exc:
    #         # logger.error(f"LDAP error: {exc}")
    #         return Response({'error': 'LDAP error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)