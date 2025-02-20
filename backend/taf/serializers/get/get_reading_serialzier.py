from rest_framework import serializers
from ...models.record_model import TafRecordModel

class ReadingModelSerializer(serializers.ModelSerializer):
    machine = serializers.SerializerMethodField(method_name="machine_full_name")
    def machine_full_name(self, obj):
        if obj.machine:
           return f"{obj.machine.machine_name}-{obj.machine.machine_code}"
        return None

    class Meta:
        model = TafRecordModel
        fields = [
            'record_id',
            'machine', 
            'new_record', 
            'previous_record',
            'record_date', 
            'record_update' 
        ]


