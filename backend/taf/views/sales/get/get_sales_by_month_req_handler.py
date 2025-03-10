from rest_framework import generics, status, mixins
from rest_framework.response import Response
from datetime import datetime
import calendar
from ....models.sales_info_model import SalesInformationModel
from ....serializers.get.sales_info_serializer import SalesInformationSerializer
from django.db.models import Sum
from exceptions.exceptions import CustomExceptionForError


class MonthlySalesAPIView(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SalesInformationSerializer
    # permission_classes = [IsAuthenticated]  # Requires authentication (optional)

    def get(self, request, *args, **kwargs):
        try: 
            month = request.query_params.get("month")  # Extract month
            year = request.query_params.get("year")    # Extract year

            # Default to current month and year if not provided
            current_date = datetime.now()
            month = int(month) if month else current_date.month
            year = int(year) if year else current_date.year

            # Fetch sales data for the given month and year
            sales_data = (
                SalesInformationModel.objects
                .filter(created_at__year=year, created_at__month=month)
                .annotate(total_sales=Sum("sold_in_money"))
                .order_by("created_at")
            )

            # Convert month number to month name 
            month_name = calendar.month_name[month]  
            if not sales_data:
                raise CustomExceptionForError(message=f"No sales for {month_name} {year}", error_type="NOT_FOUND", status_code=404)

            # Serialize the filtered queryset
            serializer = self.get_serializer(sales_data, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=status.HTTP_404_NOT_FOUND)
             