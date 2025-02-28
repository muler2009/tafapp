from django.urls import path
from .views.get.get_sales_request_handler import SalesInformationRequestHandler
from .views.get.get_machines import MachineRequestHandler
from .views.get.get_stock_request_handler import StockGetRequestHandler
from .views.get.get_all_reading_req_handler import ReadingGetRequestHandler
from .views.get.get_fuel_type import FuelTypeGetRequestHandler
from .views.post.create_reading_req_handler import ReadingCreateRequestHandler
from .views.post.machine_create_request_handler import MachineCreateRequestHandler
from .views.post.create_stock_req_handler import StockCreateRequestHandler
from .views.delete.delete_machine_request_handler import MachineRemoveRequestHandler

app_name ='taf'

urlpatterns = [
    # all get url
    path('machines/', MachineRequestHandler.as_view(), name='taf-machine-get'),
    path('sales/', SalesInformationRequestHandler.as_view(), name='taff-sales_info'),
    path('stock/', StockGetRequestHandler.as_view(), name='taff-stock_info'),
    path('reading/', ReadingGetRequestHandler.as_view(), name='taff-reading_info'),
    path('fuel/', FuelTypeGetRequestHandler.as_view(), name='taff-fuel_info'),

    # all post url
    path('machine-create/', MachineCreateRequestHandler.as_view(), name='taf-machine-create'),
    path('new_reading/', ReadingCreateRequestHandler.as_view(), name='taf-reading-create'),
    path('add_to_stock/', StockCreateRequestHandler.as_view(), name='taf-stock-create'),

    # delete urls
    path('machine-remove/<str:machine_id>/', MachineRemoveRequestHandler.as_view(), name='taf-delete')



]
