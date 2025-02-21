from rest_framework import serializers
from ...models.machine_model import MachineModel
from ...models.diesel_type import NedajTypeModel


class MachineSerialzier(serializers.ModelSerializer):
    nedaj_type = serializers.SlugRelatedField(slug_field='type_name', queryset=NedajTypeModel.objects.all())

    class Meta:
        model = MachineModel
        fields = [
            'machine_name',
            'machine_code',
            'nedaj_type', # referencing the fuel type
            'registration_date'
        ]

        extra_kwargs = {
            'machine_id': {'read_only': True}, 
            'registration_date': {'read_only': True} 
        }   

    def validate(self, attrs):
    
        machine_name = attrs.get('machine_name')
        machine_code = attrs.get('machine_code')
        nedaj_type = attrs.get('nedaj_type')

        if not isinstance(machine_name, str):
            raise serializers.ValidationError("Machine name should be string")
        
        if not isinstance(machine_code, str):
            raise serializers.ValidationError(f"{machine_code} Machine Code should be string")
        
        if not isinstance(nedaj_type, str):
            raise serializers.ValidationError("Invalid Fuel Type")
        
        
        return attrs

    def create(self, validated_data):
        taf_machine = MachineModel.objects.create(
            machine_name = validated_data.get("machine_name"),
            machine_code = validated_data.get("machine_code"),
            nedaj_type = validated_data.get("nedaj_type")
        )

        return taf_machine

