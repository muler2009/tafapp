from rest_framework import serializers
from ...models.sales_info_model import SalesInformationModel


class SalesInformationSerializer(serializers.ModelSerializer):
    machine = serializers.SerializerMethodField()
    record = serializers.SerializerMethodField(method_name='record_value')

    def get_machine(self, obj):
        return obj.machine.machine_name if obj.machine else None
    
    def record_value(self, obj):
        return obj.record.new_record if obj.record else None


    class Meta:
        model = SalesInformationModel
        fields = [
            'machine',
            'record',
            'unit_price', 
            'sold_qty',
            'sold_in_money',
            'created_at' 
        ]

