from django.apps import AppConfig


class TafConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'taf'

    def ready(self):
        import taf.signals.update_sales_stock_signal