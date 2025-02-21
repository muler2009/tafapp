from rest_framework import serializers
from decimal import Decimal
from ...models.record_model import TafRecordModel
from ...models.stock_model import Stock
from ...models.machine_model import MachineModel
from ...serializers.get.get_machine_serializer import MachineGetSerializerModel


class CreateReadingSerializer(serializers.ModelSerializer):
    machine = serializers.SlugRelatedField(slug_field='machine_name', queryset=MachineModel.objects.all())

    class Meta:
        model = TafRecordModel
        fields = [ 'machine', 'new_record', 'previous_record']
        extra_kwrags = {
            'record_id': { 'read_only': True },
            'record_date': {'read_only': True}, 
            'record_update': {'read_only': True } 
        }

    def validate(self, attrs):
    
        machine = attrs.get('machine')
        new_record = attrs.get('new_record')
        previous_record = attrs.get('previous_record', Decimal("0.000"))

        stock = Stock.objects.filter(nedaj_type=machine.nedaj_type).first()
        if not stock:
            raise serializers.ValidationError("No stock found for the machine's fuel type.")
        
        if stock.remaining <= Decimal("0.000"):
            raise serializers.ValidationError("The stock for this fuel type is Empty.")
        
        if new_record < 0:
            raise serializers.ValidationError("The New record should be greate than zero!")

        
        if new_record > stock.remaining:
            raise serializers.ValidationError("The new record must not exceed the remaining fuel")

        return attrs


    def create(self, validated_data):
        record = TafRecordModel.objects.create(
            machine = validated_data.get("machine"),
            new_record = validated_data.get("new_record")
        )
        return record

        
