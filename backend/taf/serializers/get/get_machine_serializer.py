from rest_framework import serializers
from ...models.machine_model import MachineModel

class MachineGetSerializerModel(serializers.ModelSerializer):

    nedaj_type = serializers.SerializerMethodField(method_name="fuel_type")

    def fuel_type(self, obj):
        if obj.nedaj_type:
            return obj.nedaj_type.type_name
        return
    
    class Meta:
        model = MachineModel
        fields = [
            "machine_id",
            "machine_name",
            "machine_code",
            "registration_date",
            "nedaj_type"
        ]