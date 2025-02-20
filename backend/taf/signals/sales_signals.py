from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from decimal import Decimal
from ..models.record_model import TafRecordModel
from ..models.sales_info_model import SalesInformationModel
from ..models.stock_model import Stock


@receiver(post_save, sender=TafRecordModel)
def update_sales(sender, instance, created, **kwargs):
    """Updates or creates a sales record for the corresponding machine when a new TafRecordModel is added."""
    if created:
        machine = instance.machine

        # Retrieve the stock for the machine's fuel type
        stock = Stock.objects.filter(nedaj_type=machine.nedaj_type).first()
        if not stock:
            raise ValueError("Stock not found for the machine's fuel type.")

        # Retrieve unit price from Stock
        unit_price = stock.unit_price
        if not unit_price:
            raise ValueError("Unit price is not set for this fuel type.")

        # Get the last record for this machine (excluding the current one)
        last_record = (
            TafRecordModel.objects.filter(machine=machine)
            .exclude(record_id=instance.record_id)
            .order_by('-record_date')
            .first()
        )

        # Calculate sold quantity
        # previous_record = last_record.new_record if last_record else Decimal("0.000")
        sold_qty = instance.new_record 
        sold_qty = max(Decimal("0.000"), sold_qty)  # Ensure sold_qty is not negative

        # Create a new sales entry
        SalesInformationModel.objects.create(
            machine=instance.machine,
            record=instance,
            unit_price=unit_price,
            sold_qty=sold_qty,
            sold_in_money=sold_qty * unit_price
        )

        # # Update or create sales record
        # sales_entry, created = SalesInformationModel.objects.get_or_create(
        #     machine=machine,
        #     defaults={
        #         "record": instance,
        #         "unit_price": unit_price,
        #         "sold_qty": sold_qty,
        #         "sold_in_money": sold_qty * unit_price
        #     }
        # )

        # # If the sales record already exists, update it
        # if not created:
        #     sales_entry.sold_qty += sold_qty
        #     sales_entry.sold_in_money = sales_entry.sold_qty * unit_price
        #     sales_entry.save()


# @receiver(pre_save, sender=TafRecordModel)
# def set_previous_record(sender, instance, **kwargs):
#     """
#     Before saving a new record, set the previous_record field to 
#     the latest record for the same machine.
#     """
#     last_record = TafRecordModel.objects.filter(machine=instance.machine).order_by('-record_date').first()
    
#     if last_record or not instance.previous_record:
#         instance.previous_record = last_record.new_record
#     else:
#         instance.previous_record = Decimal("0.000")  # Default value if no previous record exists
 

# @receiver(post_save, sender=TafRecordModel)
# def create_sales_entry(sender, instance, created, **kwargs):
#    if created and instance.previous_record is not None and instance.previous_record != instance.new_record:
#         sold_qty = instance.new_record - instance.previous_record
#         unit_price = Decimal("5.00")  # Convert to Decimal

#         # Calculate total sales in money
#         sold_in_money = sold_qty * unit_price

#         # Create Sales entry
#         SalesInformationModel.objects.create(
#             machine=instance.machine,
#             record=instance,
#             unit_price=unit_price,
#             sold_qty=sold_qty,
#             sold_in_money=sold_in_money
#         )

# @receiver(post_save, sender=TafRecordModel)
# def create_sales_entry(sender, instance, created, **kwargs):
#     if created:
#         # Get the previous record for the same machine
#         previous_record = TafRecordModel.objects.filter(
#             machine=instance.machine,
#             record_date__lt=instance.record_date  # Ensure we get the last record
#         ).order_by('-record_date').first()

#         print(f"Previous Record Found: {previous_record}")  # Debugging Log

#         if previous_record:
#             sold_qty = instance.new_record - previous_record.new_record
#             unit_price = Decimal("5.00")  # Replace with actual unit price logic

#             # Calculate total sales in money
#             sold_in_money = sold_qty * unit_price

#             if sold_qty > 0:
#                 sales_entry =SalesInformationModel.objects.create(
#                     machine=instance.machine,
#                     record=instance,
#                     unit_price=unit_price,
#                     sold_qty=sold_qty,
#                     sold_in_money=sold_in_money
#                 )

#                 print(f"Sales Created: {sales_entry}")  # Debugging Log

# @receiver(post_save, sender=TafRecordModel)
# def update_stock_and_sales(sender, instance, created, **kwargs):
#     """Updates Stock attributes dynamically when a new Record is added."""
#     if created:
#         machine = instance.machine
        
#         # Get or create Stock for the machine
#         stock, _ = Stock.objects.get_or_create(machine=machine)

#         # Get the last record for this machine (excluding the current one)
#         last_record = TafRecordModel.objects.filter(machine=machine).exclude(record_id=instance.record_id).order_by('-record_date').first()

#         # Set previous record
#         instance.previous_record = last_record.new_record if last_record else Decimal("0.000")
#         instance.new_record = instance.previous_record + instance.total_liters

#         # Update Record fields
#         TafRecordModel.objects.filter(record_id=instance.record_id).update(
#             new_record=instance.new_record,
#             previous_record=instance.previous_record
#         )

#         # Calculate Sold Quantity
#         sold_qty = instance.new_record - instance.previous_record

#         # Update Stock
#         stock.prev_qty = stock.total_liters
#         stock.sold_qty += sold_qty
#         stock.remaining = stock.total_liters - stock.sold_qty
#         stock.save()

#         # Create Sales Entry if fuel was sold
#         if sold_qty > 0:
#             unit_price = Decimal("5.00")  # Replace with actual price logic
#             SalesInformationModel.objects.create(
#                 machine=machine,
#                 record=instance,
#                 unit_price=unit_price,
#                 sold_qty=sold_qty,
#                 sold_in_money=sold_qty * unit_price
#             )
