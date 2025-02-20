# Generated by Django 5.1.6 on 2025-02-20 07:54

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taf', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tafrecordmodel',
            name='previous_record',
            field=models.DecimalField(decimal_places=3, default=Decimal('0.000'), help_text='immediate previous machine record value', max_digits=15),
        ),
    ]
