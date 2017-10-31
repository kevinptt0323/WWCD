from django.contrib import admin
from .models import VisitRecord
# Register your models here.


@admin.register(VisitRecord)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('mac_address', 'first_seen', 'last_seen')

