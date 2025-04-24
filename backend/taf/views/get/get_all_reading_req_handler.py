from rest_framework import status
from rest_framework.response import Response
from .base_get_request_handler import BaseGetRequestHandler
from ...serializers.get.get_reading_serialzier import ReadingModelSerializer
from ...models.record_model import TafRecordModel


class ReadingGetRequestHandler(BaseGetRequestHandler):
    serializer_class = ReadingModelSerializer
    queryset = TafRecordModel.objects.all()

    def get_empty_response(self):
        return Response({
            "message": "Empty.",
            "error_type": "NO_FOUND",
            "status_code": 200,
            "detail": "OOps! No Record found"
        }, status=status.HTTP_200_OK)

