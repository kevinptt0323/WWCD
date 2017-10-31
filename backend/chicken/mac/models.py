from django.db import models

# Create your models here.
class VisitRecord(models.Model):
    id = models.AutoField(primary_key=True)
    mac_address = models.CharField(max_length=20)
    first_seen = models.DateTimeField()
    last_seen = models.DateTimeField()
