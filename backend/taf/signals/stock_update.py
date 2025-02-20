from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models.record_model import TafRecordModel
from ..models.stock_model import Stock
from decimal import Decimal

@receiver(post_save, sender=TafRecordModel)
def update_stock(sender, instance, created, **kwargs):
    """Updates stock when a new record is added for a machine."""
    if created:
        machine = instance.machine

        # Find the Stock that matches the Machine's fuel type
        stock = Stock.objects.filter(nedaj_type=machine.nedaj_type).first()
        if not stock:
            print(f"No stock found for fuel type: {machine.nedaj_type}")
            return  # No stock found for this fuel type, do nothing

        # Get the last record for this machine (excluding the current one)
        last_record = (
            TafRecordModel.objects.filter(machine=machine)
            .exclude(record_id=instance.record_id)
            .order_by('-record_date')
            .first()
        )

        # Calculate the previous quantity and sold quantity
        if last_record:
            previous_record = last_record.new_record
        else:
            previous_record = Decimal("0.000")

        # Debugging: Print current values
        print(f"Previous record: {previous_record}")
        print(f"Current new_record: {instance.new_record}")
        print(f"Initial stock remaining: {stock.remaining}")

        # Update Stock values
        stock.prev_qty = stock.remaining  # Previous quantity should be the last remaining stock
        sold_qty = instance.new_record   # Fuel consumed since last record

        # Debugging: Print sold_qty
        print(f"Sold quantity: {sold_qty}")

        stock.sold_qty += sold_qty
        stock.remaining = stock.prev_qty - sold_qty  # Remaining stock should be recalculated

        # Ensure values do not go negative
        stock.sold_qty = max(stock.sold_qty, Decimal("0.000"))
        stock.remaining = max(stock.remaining, Decimal("0.000"))

        # Debugging: Print updated values
        print(f"Updated prev_qty: {stock.prev_qty}")
        print(f"Updated sold_qty: {stock.sold_qty}")
        print(f"Updated remaining: {stock.remaining}")

        # Save the updated stock
        stock.save()