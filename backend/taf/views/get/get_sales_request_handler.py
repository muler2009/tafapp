from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .base_get_request_handler import BaseGetRequestHandler
from ...models.sales_info_model import SalesInformationModel
from ...serializers.get.sales_info_serializer import SalesInformationSerializer



class SalesInformationRequestHandler(BaseGetRequestHandler):
    serializer_class = SalesInformationSerializer
    authentication_classes = [JWTAuthentication]
    queryset = SalesInformationModel.objects.all()

    def get_empty_response(self):
        return Response({
            "message": "Empty",
            "error_type": "NO_REGISTRED",
            "status_code": 204,
            "detail": "OOps! No sales record available"
        }, status=status.HTTP_200_OK)

