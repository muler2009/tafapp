from rest_framework import status
from .base_get_request_handler import BaseGetRequestHandler
from rest_framework.response import Response
from ...models.stock_model import Stock
from ...serializers.get.get_stock_serializer import StockModelSerializer

class StockGetRequestHandler(BaseGetRequestHandler):
    serializer_class = StockModelSerializer
    queryset = Stock.objects.all()

    def get_empty_response(self):
        return Response({
            "message": "Stock is Empty",
            "error_type": "EMPTY",
            "status_code": 200,
            "detail": "Nothing added to the stock"
        }, status=status.HTTP_200_OK)
