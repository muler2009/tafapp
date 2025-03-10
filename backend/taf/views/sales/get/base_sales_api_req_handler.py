import calendar
from datetime import datetime
from rest_framework import status, mixins, generics
from rest_framework.response import Response
from rest_framework.request import Request
from ....serializers.get.sales_info_serializer import SalesInformationSerializer
from ....models.sales_info_model import SalesInformationModel
from django.db.models import Sum
from exceptions.exceptions import CustomExceptionForError

class BaseGetSalesRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SalesInformationSerializer
    model = SalesInformationModel
    sales_field = "sold_in_money"

    def get_sales_data(self, filter_kwargs):
        """
        Fetch sales data based on filter conditions.
        """
        sales_data = self.model.objects.filter(**filter_kwargs).aggregate(
            total_sales=Sum(self.sales_field)
        )

        # Extract total sales (default to 0 if None)
        total_sales = sales_data.get("total_sales", 0) or 0

        return total_sales
    
    def handle_response(self, total_sales, date_str):
        """
        Format the API response.
        """
        if total_sales == 0:
            raise CustomExceptionForError(
                message=f"No sales recorded for {date_str}",
                error_type="NOT_FOUND",
                status_code=404
            )

        return Response({
            "date": date_str,
            "total_sales": total_sales
        }, status=status.HTTP_200_OK)
