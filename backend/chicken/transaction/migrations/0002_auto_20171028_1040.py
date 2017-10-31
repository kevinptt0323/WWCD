# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-28 10:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transactionrecords',
            name='item',
        ),
        migrations.AddField(
            model_name='transactionrecords',
            name='amount',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transactionrecords',
            name='item_name',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transactionrecords',
            name='payment',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transactionrecords',
            name='payment_auth',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transactionrecords',
            name='price',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Items',
        ),
    ]
