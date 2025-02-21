from rest_framework import serializers
from ...models.stock_model import Stock
from ...models.diesel_type import NedajTypeModel
from decimal import Decimal



class StockSerializer(serializers.ModelSerializer):
    nedaj_type = serializers.SlugRelatedField(slug_field='type_name', queryset=NedajTypeModel.objects.all())
   

    class Meta:
        model = Stock
        fields = [
            "nedaj_type",
            "total_liters",
            "unit_price",
        ]

        extra_kwrags = {
            'stock_id': { 'read_only': True },
            'stocked_date': {'read_only': True}, 
        }

    def validate(self, attrs):
        total_liters = attrs.get('total_liters')
        unit_price = attrs.get('unit_price')

        if total_liters <= Decimal("0.000") or unit_price <= Decimal("0.000"):
            raise serializers.ValidationError(f"Invalid Value! Check you either Total Price or Unit price value is wrong")


        return attrs
    
    def create(self, validated_data):
        stock_object = Stock.objects.create(
            nedaj_type = validated_data.get("nedaj_type"),
            total_liters = validated_data.get("total_liters"),
            unit_price = validated_data.get("unit_price")

        )
        return stock_object