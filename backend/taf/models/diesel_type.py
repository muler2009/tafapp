import uuid
from django.db import models


class NedajTypeModel(models.Model):
    type_id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    type_name = models.CharField(max_length=255)


    def __str__(self):
        return f"{self.type_name}"