from rest_framework import generics, status, permissions, mixins
from rest_framework.response import Response
from rest_framework.request import Request
from exceptions.exceptions import CustomExceptionForError
from ...models.stock_model import Stock
from ...serializers.create.create_stock_serializer import StockSerializer

class StockCreateRequestHandler(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = StockSerializer

    def post(self, request: Request, *args, **kwargs):
        try:
            stock_serializer = self.validate_request_data(request=request)
            self.save_stock_instance(stock_serializer)
        except CustomExceptionForError as exception:
            return Response({
                "message": str(exception.message),  # Ensure message is string
                "error_type": str(exception.error_type),  # Ensure error_type is string
                "status_code": exception.status_code
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status_code': 201,
                'status_text': 'Stocked successful'
            }, status=status.HTTP_201_CREATED)

    # Validates the request data that will be posted
    def validate_request_data(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if not serializer.is_valid():
            raise CustomExceptionForError(
                message=serializer.errors, error_type="Failed Stocking!", status_code=400
            )
        return serializer

    def save_stock_instance(self, serializer):
        return serializer.save()
