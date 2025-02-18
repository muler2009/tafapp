from django.contrib import admin
from .models.machine_model import MachineModel
from .models.record_model import TafRecordModel
from .models.sales_info_model import SalesInformationModel
from .models.diesel_type import NedajTypeModel
from .models.stock_model import Stock

# Register your models here.
admin.site.register(MachineModel)
admin.site.register(TafRecordModel)
admin.site.register(SalesInformationModel)
admin.site.register(NedajTypeModel)
admin.site.register(Stock)
