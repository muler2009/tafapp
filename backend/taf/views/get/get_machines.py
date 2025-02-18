from rest_framework import generics, status, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from exceptions.exceptions import CustomExceptionForError
from ...models.machine_model import MachineModel
from ...serializers.get.get_machine_serializer import MachineGetSerializerModel


class MachineRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = MachineModel.objects.all()
    serializer_class = MachineGetSerializerModel

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
