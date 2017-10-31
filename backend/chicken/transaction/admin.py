from django.contrib import admin
from .models import TransactionRecords
# Register your models here.


@admin.register(TransactionRecords)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_id', 'item_name', 'amount', 'price', 'payment', 'payment_auth', 'transaction_time', 'store')
