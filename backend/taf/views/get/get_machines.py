from rest_framework import status
from .base_get_request_handler import BaseGetRequestHandler
from rest_framework.response import Response
from ...models.machine_model import MachineModel
from ...serializers.get.get_machine_serializer import MachineGetSerializerModel

class MachineRequestHandler(BaseGetRequestHandler):
    queryset = MachineModel.objects.all()
    serializer_class = MachineGetSerializerModel

    def get_empty_response(self):
        return Response({
            "message": "Empty",
            "error_type": "NO_REGISTRED",
            "status_code": 200,
            "detail": "OOPs! No machine registered in the system "
        }, status=status.HTTP_200_OK)