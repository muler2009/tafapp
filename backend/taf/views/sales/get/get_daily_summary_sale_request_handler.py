from django.db.models import Sum
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from datetime import datetime
import calendar
from ....models.sales_info_model import SalesInformationModel
from ....serializers.get.get_all_summary_serializer import DailySalesSummarySerializer
from exceptions.exceptions import CustomExceptionForError
from ....models.stock_model import Stock
from ....models.diesel_type import NedajTypeModel
class DailySalesSummaryRequestHandler(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = DailySalesSummarySerializer

    def get(self, request, *args, **kwargs):
        try:
            # Get today's date
            today = datetime.today()
            day, month, year = today.day, today.month, today.year
            month_name = calendar.month_name[month]

            # Fetch sales for today
            sales_data = SalesInformationModel.objects.filter(
                created_at__year=year,
                created_at__month=month,
                created_at__day=day
            )

            # If no sales, raise a custom exception
            if not sales_data.exists():
                raise CustomExceptionForError(
                    message=f"No sales recorded for {day} {month_name} {year}",
                    error_type="NOT_FOUND",
                    status_code=404
                )

            # Group sales by fuel type (nedaj_type)
            fuel_sales = sales_data.values("machine__nedaj_type").annotate(
                total_sold_qty=Sum("sold_qty"),
                total_sales=Sum("sold_in_money")
            )

            # Prepare summary response
            summary_list = []
            for record in fuel_sales:
                nedaj_type_id = record["machine__nedaj_type"]

                # Get unit price from Stock model based on fuel type
                stock = Stock.objects.filter(nedaj_type=nedaj_type_id).first()
                fuel_name = NedajTypeModel.objects.get(type_id=nedaj_type_id).type_name               
                unit_price = stock.unit_price if stock else None

                print(f"Stock {fuel_name}")

                summary_list.append({
                    "fuel_type": fuel_name,  # 🔹 Change key from 'machine' to 'fuel_type'
                    "total_sold_qty": record["total_sold_qty"],
                    "total_sales": record["total_sales"],
                    "unit_price": unit_price
                })

            # 🔹 Fix: Make sure the serializer is structured correctly
            return Response(summary_list, status=status.HTTP_200_OK)

        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=status.HTTP_404_NOT_FOUND)