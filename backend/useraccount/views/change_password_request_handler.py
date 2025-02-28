from rest_framework import generics, permissions, status, mixins
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from rest_framework.response import Response
from exceptions.exceptions import CustomExceptionForError
from ..serializer.change_password_serializer import ChangePasswordSerializer
from ..models.models import TafUserAccountsModel

class ChangeUserPasswordRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = ChangePasswordSerializer

    def post(self, request:Request, *args, **kwargs):
         # Ensure the user is authenticated before proceeding
        try:

            if request.user.is_anonymous:
                return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)
            password_serialzier = self.serializer_class(data=request.data, context={"request": request})
            if not password_serialzier.is_valid():
                raise CustomExceptionForError(message=password_serialzier.errors, error_type="Change Failed!", status_code=400)
            user = request.user
            password_serialzier.update(user, password_serialzier.validated_data)
            return Response({"message": "Password Changed Successfully"})
        
        except CustomExceptionForError as password_change_exception:
            return Response({
                "message": password_change_exception.message,
                "error_type": password_change_exception.error_type,
                "status_code": password_change_exception.status_code
            }, status=status.HTTP_400_BAD_REQUEST)
        
     


