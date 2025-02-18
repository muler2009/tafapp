from django.db.models.signals import post_save
from django.dispatch import receiver
from decimal import Decimal
from django.db import transaction
from ..models.record_model import TafRecordModel
from ..models.stock_model import Stock
from ..models.sales_info_model import SalesInformationModel
from django.db.models import F

@receiver(post_save, sender=TafRecordModel)
def update_stock_and_sales(sender, instance, created, **kwargs):
    """Updates stock and sales when a new Record is created."""
    if created:
        try: 
            with transaction.atomic():

                machine = instance.machine
                nedaj_type = machine.nedaj_type

                # Get or create Stock for this fuel type
                stock, _ = Stock.objects.get_or_create(nedaj_type=nedaj_type)

                # Get the last record for this machine (excluding the current one)
                last_record = (
                    TafRecordModel.objects.filter(machine=machine)
                    .exclude(record_id=instance.record_id)
                    .order_by('-record_date')
                    .first()
                )
                
                # Determine previous record dynamically
                previous_record = last_record.new_record if last_record else Decimal("0.000")

                # Calculate Sold Quantity
                sold_qty = instance.new_record - previous_record

              # Update Stock attributes atomically
                stock.prev_qty = stock.total_liters
                stock.sold_qty = F('sold_qty') + sold_qty
                stock.remaining = F('total_liters') - F('sold_qty')
                stock.save()


                # Create Sales Entry if fuel was sold
                if sold_qty > 0:
                    unit_price = stock.unit_price  # Retrieve unit price from Stock
                    if not unit_price:
                        raise ValueError("Unit price is not set for this fuel type.")

                    SalesInformationModel.objects.create(
                        machine=machine,
                        record=instance,
                        unit_price=unit_price,
                        sold_qty=sold_qty,
                        sold_in_money=sold_qty * unit_price
                    )
        except Exception as e:
            # Log the error or handle it appropriately
            print(f"Error updating stock and sales: {e}")
            raise  # Re-raise the exception to ensure the transaction is rolled back
