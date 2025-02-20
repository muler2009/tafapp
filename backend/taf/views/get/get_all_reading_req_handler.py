from rest_framework import generics, mixins, status
from rest_framework.request import Request
from rest_framework.response import Response
from ...models.record_model import TafRecordModel
from ...serializers.get.get_reading_serialzier import ReadingModelSerializer
from exceptions.exceptions import CustomExceptionForError



class ReadingGetRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = ReadingModelSerializer
    queryset = TafRecordModel.objects.all()

    def get(self, request:Request):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="Not Found", error_type="NOT_FOUND_ERROR")
            
            serialized_stock = self.serializer_class(data, many=True)
            
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error type": exc.error_type
            }, status=status.HTTP_204_NO_CONTENT)

        else: 
            return Response(serialized_stock.data, status=status.HTTP_200_OK)
