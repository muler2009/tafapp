from rest_framework import serializers
from ...models.diesel_type import NedajTypeModel


class FuelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=NedajTypeModel
        fields =[
            "type_id",
            "type_name"
        ]