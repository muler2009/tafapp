import uuid
from decimal import Decimal
from django.db import models
from .machine_model import MachineModel


class TafRecordModel(models.Model):
    record_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=True)
    machine = models.ForeignKey(MachineModel, on_delete=models.CASCADE, related_name="machine")
    new_record = models.DecimalField(max_digits=15, decimal_places=3, default=Decimal("0.000"), help_text="New machine record value")
    record_date = models.DateTimeField(auto_now_add=True)
    record_update = models.DateTimeField(auto_now=True)
    previous_record = models.DecimalField(max_digits=15, decimal_places=3, default=Decimal("0.000"), help_text="immediate previous machine record value")


    def __str__(self):
        return f"{self.machine.machine_name} - {self.machine.machine_code}"
    
    class Meta:
        db_table = "Record"
        app_label = 'taf'
    
    def save(self, *args, **kwargs):
        # Fetch the last record for the same machine (excluding the current record if it exists)
        last_record = (
            TafRecordModel.objects.filter(machine=self.machine)
            .exclude(record_id=self.record_id)
            .order_by('-record_date')
            .first()
        )

        # Set the previous_record to the new_record of the last record
        if last_record:
            self.previous_record = last_record.new_record
        else:
            self.previous_record = Decimal("0.000")  # No previous record exists

        super().save(*args, **kwargs)