from rest_framework import serializers
from ...models.stock_model import Stock


class StockModelSerializer(serializers.ModelSerializer):
    nedaj_type = serializers.SerializerMethodField(method_name="fuel_type")
    
    def fuel_type(self, obj):
        if obj.nedaj_type:
            return obj.nedaj_type.type_name
        return
    
    class Meta:
        model = Stock
        fields = [
            'nedaj_type', 
            'total_liters', 
            'unit_price', 
            'prev_qty', 
            'sold_qty', 
            'remaining',
            'stocked_date', 
        ]
