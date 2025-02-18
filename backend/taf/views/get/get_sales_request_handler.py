from rest_framework import generics
from ...models.sales_info_model import SalesInformationModel
from ...serializers.get.sales_info_serializer import SalesInformationSerializer


class SalesInformationRequestHandler(generics.ListAPIView):
    serializer_class = SalesInformationSerializer
    queryset = SalesInformationModel.objects.all()