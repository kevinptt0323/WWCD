from django.db import models

# Create your models here.

class TransactionRecords(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.CharField(max_length=50)
    item_name = models.CharField(max_length=30)
    amount = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    payment = models.CharField(max_length=30)
    payment_auth = models.CharField(max_length=50)
    transaction_time = models.DateTimeField()
    store = models.CharField(max_length=50)


