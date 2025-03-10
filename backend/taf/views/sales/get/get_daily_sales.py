from django.db.models import Sum
from rest_framework import generics, status
from rest_framework.response import Response
from datetime import datetime
import calendar
from ....models import SalesInformationModel
from ....serializers.get.sales_info_serializer import SalesInformationSerializer
from exceptions.exceptions import CustomExceptionForError  # Import custom exception

class TodaySalesAPIView(generics.GenericAPIView):
    serializer_class = SalesInformationSerializer

    def get(self, request, *args, **kwargs):
        try:
            today = datetime.today()
            year, month, day = today.year, today.month, today.day

            # Convert month number to month name
            month_name = calendar.month_name[month]

            # Fetch today's sales data (full queryset)
            sales_queryset = SalesInformationModel.objects.filter(
                created_at__year=year, created_at__month=month, created_at__day=day
            )

            # If no sales, raise custom exception
            if not sales_queryset.exists():
                raise CustomExceptionForError(
                    message=f"No sales recorded for today ",
                    error_type="NOT_FOUND",
                    status_code=404
                )

            # Calculate total sales
            total_sales = sales_queryset.aggregate(total_sales=Sum("sold_in_money"))["total_sales"] or 0

            # Serialize the full queryset
            serializer = self.get_serializer(sales_queryset, many=True)

            # return Response({
            #     "total_sales": total_sales,
            #     "sales_data": serializer.data
            # }, status=status.HTTP_200_OK)
        
            return Response(serializer.data, status=status.HTTP_200_OK)


        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=status.HTTP_404_NOT_FOUND)