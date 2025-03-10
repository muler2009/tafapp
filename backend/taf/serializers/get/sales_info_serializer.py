from rest_framework import serializers
from ...models.sales_info_model import SalesInformationModel
from django.db.models import Sum


class SalesInformationSerializer(serializers.ModelSerializer):
    machine = serializers.SerializerMethodField()
    record = serializers.SerializerMethodField(method_name='record_value')
    total_sales = serializers.SerializerMethodField()

    def get_machine(self, obj):
        if obj.machine:
           return f"{obj.machine.machine_name}-{obj.machine.machine_code}"
        return None

    def record_value(self, obj):
        return obj.record.new_record if obj.record else None
    
    def get_total_sales(self, obj):
        """ Calculate total sales for a specific machine on the given day. """
        total_sales = SalesInformationModel.objects.filter(
            created_at__date=obj.created_at.date(),  # Filter by same day
            machine=obj.machine  # Filter by the same machine
        ).aggregate(total_sales=Sum("sold_in_money"))["total_sales"]

        return total_sales or 0  # Return 0 if no sales exist


    class Meta:
        model = SalesInformationModel
        fields = [
            'machine',
            'record',
            'unit_price', 
            'sold_qty',
            'sold_in_money',
            'created_at',
            'total_sales' 
        ]

