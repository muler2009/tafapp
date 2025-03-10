from rest_framework import serializers

class MonthlySalesSummarySerializer(serializers.Serializer):
    machine = serializers.CharField()
    total_sold_qty = serializers.IntegerField()
    total_sales = serializers.DecimalField(max_digits=10, decimal_places=2)
    price = serializers.DecimalField(max_digits=5, decimal_places=2)
    