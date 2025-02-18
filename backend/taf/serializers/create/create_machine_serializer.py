from rest_framework import serializers
from ...models.machine_model import MachineModel


class MachineSerialzier(serializers.ModelSerializer):
    class Meta:
        model = MachineModel
        fields = [
            'machine_name',
            'machine_code',
            'registration_date'
        ]

        extra_kwargs = {
            'machine_id': {'read_only': True}, 
            'registration_date': {'read_only': True} 
        }   

    def create(self, validated_data):
        taf_machine = MachineModel.objects.create(
            machine_name = validated_data.get("machine_name"),
            machine_code = validated_data.get("machine_code")
        )

        return taf_machine

