import uuid
from django.db import models
from .machine_model import MachineModel
from .diesel_type import NedajTypeModel
from decimal import Decimal

class Stock(models.Model):
    """Tracks the stock of diesel per machine."""
    # machine = models.OneToOneField(MachineModel, on_delete=models.CASCADE, related_name="stock")
    stock_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True)
    nedaj_type = models.ForeignKey(NedajTypeModel, on_delete=models.CASCADE, related_name="stocks")
    total_liters = models.DecimalField(max_digits=15, decimal_places=3, default=Decimal("0.000"))
    unit_price = models.DecimalField(max_digits=4, decimal_places=2)
    prev_qty = models.DecimalField(max_digits=15, decimal_places=3, default=Decimal("0.000"))
    sold_qty = models.DecimalField(max_digits=15, decimal_places=3, default=Decimal("0.000"))
    remaining = models.DecimalField(max_digits=15, decimal_places=3, default=Decimal("0.000"))
    stocked_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.nedaj_type}-{self.total_liters}"

    class Meta:
        db_table = 'Stock'
        app_label = 'taf'


    def save(self, *args, **kwargs):
        if self.remaining == 0.000:
            self.remaining = self.total_liters
        
        super().save(*args, **kwargs)

        