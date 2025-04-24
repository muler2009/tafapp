from .base_get_request_handler import BaseGetRequestHandler
from rest_framework import status
from rest_framework.response import Response
from ...serializers.get.get_fuel_type_serializer import FuelTypeSerializer
from ...models.diesel_type import NedajTypeModel


class FuelTypeGetRequestHandler(BaseGetRequestHandler):
    serializer_class = FuelTypeSerializer
    queryset = NedajTypeModel.objects.all()

    def get_empty_response(self):
        return Response({
            "message": "No Fuel Type Found.",
            "error_type": "NO_FULE_TYPE",
            "status_code": 200
        }, status=status.HTTP_200_OK)
