import uuid
from django.db import models 
from .machine_model import MachineModel
from .record_model import TafRecordModel


class SalesInformationModel(models.Model):
    sales_id = models.UUIDField(default=uuid.uuid4)
    machine = models.ForeignKey(MachineModel, on_delete=models.CASCADE, related_name="machine_sale")
    record = models.ForeignKey(TafRecordModel, on_delete=models.CASCADE, related_name="record")
    unit_price = models.DecimalField(max_digits=4, decimal_places=2)
    sold_qty = models.DecimalField(max_digits=15, decimal_places=3)
    sold_in_money = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.machine.machine_name}"
    
    def save(self,*args, **kwargs):
        if not self.unit_price:
            self.unit_price = 87.09

        super().save(*args, **kwargs)