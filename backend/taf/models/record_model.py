import uuid
from django.db import models
from .machine_model import MachineModel


class TafRecordModel(models.Model):
    record_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=True)
    machine = models.ForeignKey(MachineModel, on_delete=models.CASCADE, related_name="machine")
    new_record = models.DecimalField(max_digits=15, decimal_places=3, help_text="New machine record value")
    # previous_record = models.DecimalField(max_digits=15, decimal_places=3, help_text="immediate previous machine record value")
    record_date = models.DateTimeField(auto_now_add=True)
    record_update = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.machine.machine_name} - {self.machine.machine_code}"
    
    class Meta:
        db_table = "Record"
        app_label = 'taf'
    
