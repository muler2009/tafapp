from django.db.models import Sum
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from datetime import datetime
import calendar
from ....models import SalesInformationModel
from ....models.stock_model import Stock
from ....serializers.get.sales_info_serializer import SalesInformationSerializer
from ....serializers.get.get_summary_serializer import MonthlySalesSummarySerializer
from exceptions.exceptions import CustomExceptionForError  # Import custom exception


class MonthlySalesSummaryView(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = MonthlySalesSummarySerializer

    def get(self, request, *args, **kwargs):
        try:
            # Get month and year from query parameters
            month = request.query_params.get("month")
            year = request.query_params.get("year")

            if not month or not year:
                return Response(
                    {"error": "Both month and year are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Convert to integers
            month, year = int(month), int(year)

            # Filter sales data for the specified month and year
            sales_data = SalesInformationModel.objects.filter(
                created_at__year=year,
                created_at__month=month
            )

            # If no sales exist, return an error
            if not sales_data.exists():
                raise CustomExceptionForError(
                    message="No sales recorded for this month",
                    error_type="NOT_FOUND",
                    status_code=404
                )

            # Aggregate sales data per machine
            machine_sales = sales_data.values("machine").annotate(
                total_sold_qty=Sum("sold_qty"),
                total_sales=Sum("sold_in_money")
            )


            # Prepare summary response
            summary_list = []
            for record in machine_sales:
                machine_obj = SalesInformationModel.objects.filter(machine=record["machine"]).first()

                stock = Stock.objects.filter(nedaj_type=machine_obj.machine.nedaj_type).first()
                unit_price = stock.unit_price

                summary_list.append({
                    "machine": f"{machine_obj.machine.machine_name}-{machine_obj.machine.machine_code}",
                    "total_sold_qty": record["total_sold_qty"],
                    "total_sales": record["total_sales"],
                    "price": unit_price  # Include price from JackModel
                })

            serilizer = self.serializer_class(summary_list, many=True)

            return Response(serilizer.data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=status.HTTP_404_NOT_FOUND)