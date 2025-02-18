from django.urls import path
from .views.post.machine_create_request_handler import MachineCreateRequestHandler
from .views.get.get_sales_request_handler import SalesInformationRequestHandler
from .views.get.get_machines import MachineRequestHandler

app_name ='taf'

urlpatterns = [
    path('machines/', MachineRequestHandler.as_view(), name='taf-machine-get'),
    path('machine-create/', MachineCreateRequestHandler.as_view(), name='taf-machine-create'),

    path('sales/', SalesInformationRequestHandler.as_view(), name='taff-sales_info')
]
