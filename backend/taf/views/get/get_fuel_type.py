from rest_framework import generics, status, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from exceptions.exceptions import CustomExceptionForError
from ...serializers.get.get_fuel_type_serializer import FuelTypeSerializer
from ...models.diesel_type import NedajTypeModel


class FuelTypeGetRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = FuelTypeSerializer
    queryset = NedajTypeModel.objects.all()

    def get(self, request:Request):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="Not Found", error_type="NOT_FOUND_ERROR")
            
            serialized_data = self.serializer_class(data, many=True)
            
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error type": exc.error_type
            }, status=status.HTTP_204_NO_CONTENT)

        else: 
            return Response(serialized_data.data, status=status.HTTP_200_OK)
