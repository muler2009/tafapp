from rest_framework import generics, status, mixins
from rest_framework.request import Request
from rest_framework.response import Response
from exceptions.exceptions import CustomExceptionForError
from ....models.sales_info_model import SalesInformationModel
from ....serializers.get.sales_info_serializer import SalesInformationSerializer



class SalesInformationRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SalesInformationSerializer
    queryset = SalesInformationModel.objects.all()

    def get(self, request:Request):
        try:
            data = self.get_queryset()
            if not data:
                raise CustomExceptionForError(message="Not Found", error_type="NOT_FOUND_ERROR")
            
            serialized_data = self.get_serializer(data, many=True)
            
        except CustomExceptionForError as exc:
            return Response({
                "message": exc.message,
                "error type": exc.error_type
            }, status=status.HTTP_204_NO_CONTENT)

        else: 
            return Response(serialized_data.data, status=status.HTTP_200_OK)

