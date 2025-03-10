from django.db.models import Sum
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from datetime import datetime
import calendar
from ....models import SalesInformationModel
from ....serializers.get.sales_info_serializer import SalesInformationSerializer
from exceptions.exceptions import CustomExceptionForError  # Import custom exception


class DailySalesSummaryByMachineView(generics.GenericAPIView, mixins.ListModelMixin):

    def get(self, request, *args, **kwargs):
        try:
            today = datetime.today()
            machine_id = request.query_params.get("machine_id")  # Get machine ID from request
            
            if not machine_id:
                return Response(
                    {"error": "Machine ID is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Filter sales data for the specific machine and today's date
            sales_data = SalesInformationModel.objects.filter(
                created_at__date=today.date(),
                machine_id=machine_id
            )

            # If no sales exist, return an error
            if not sales_data.exists():
                raise CustomExceptionForError(
                    message="No sales recorded for this machine today",
                    error_type="NOT_FOUND",
                    status_code=404
                )

            # Calculate total sales and quantity for the machine
            total_sold_qty = sales_data.aggregate(total_qty=Sum("sold_qty"))["total_qty"] or 0
            total_sales = sales_data.aggregate(total_sales=Sum("sold_in_money"))["total_sales"] or 0

            # Prepare summary response
            summary_data = {
                "machine": f"{sales_data.first().machine.machine_name}-{sales_data.first().machine.machine_code}",
                "total_sold_qty": total_sold_qty,
                "total_sales": total_sales
            }

            return Response(summary_data, status=status.HTTP_200_OK)

        except CustomExceptionForError as exception:
            return Response({
                "message": exception.message,
                "error_type": exception.error_type,
                "status_code": exception.status_code
            }, status=status.HTTP_404_NOT_FOUND)