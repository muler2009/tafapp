import uuid
from django.db import models
from .diesel_type import NedajTypeModel



class MachineModel(models.Model):
    machine_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=True)
    machine_name = models.CharField(max_length=254, help_text="Machine name reference")
    machine_code = models.CharField(max_length=100, help_text="Machine code")
    nedaj_type = models.ForeignKey(NedajTypeModel, on_delete=models.CASCADE, related_name="machines")
    registration_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.machine_name} - {self.machine_code}"
    
    class Meta:
        ordering = ["machine_name"]
        db_table = "Machine"
        app_label = 'taf'
    
