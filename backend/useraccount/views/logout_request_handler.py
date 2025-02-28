from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class UserLogoutRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    def post(self, request):
        refreshToken = request.data.get('refreshToken')
        if refreshToken:
            try:
                token = RefreshToken(refreshToken)
                token.blacklist()
                return Response({'message': "Logout Successfully!"}, status=status.HTTP_200_OK)
            except Exception as exception:
               return Response({'error': str(exception)}, status=status.HTTP_400_BAD_REQUEST)
        else:
               return Response({'error': 'Refresh token not provided.'}, status=status.HTTP_400_BAD_REQUEST)

