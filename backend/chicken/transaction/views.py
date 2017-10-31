from django.shortcuts import render
from .models import TransactionRecords
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from django.http import HttpResponse, HttpResponseNotFound
from rest_framework.response import Response
from django.forms import model_to_dict
import json
import hashlib
import pandas as pd
from datetime import datetime


# Create your views here.

class TransacViewSet(viewsets.ViewSet):
    queryset = TransactionRecords.objects.all()

    @list_route(methods=['post'], url_path='transac')
    def create_transac(self, request):
        trans = request.data
        dt = datetime.now().strftime('%Y-%m-%d %H:%M')
        items = trans.get('items')
        payment = trans.get('payment')
        payment_auth = trans.get('payment_auth')
        store = trans.get('store')
        order_id = hashlib.sha256(dt.encode()).hexdigest()
        for item in items:
            name = item.get('name')
            price = item.get('price')
            amount = item.get('amount')
            self.queryset.create(
                    order_id = order_id,
                    store = store,
                    item_name = name,
                    amount = amount,
                    price = price,
                    payment = payment,
                    payment_auth = payment_auth,
                    transaction_time = dt,
                    )
        return Response({})

    @detail_route(methods=['get'], url_path='transac')
    def read_transac(self, request, pk= None):
        if( pk == None):
            return HttpResponse()
        trans = self.queryset.filter(store=pk).values('order_id', 'item_name', 'amount', 'price', 'payment', 'payment_auth', 'transaction_time', 'id')
        return Response({"data":trans})

    @detail_route(methods=['get'], url_path='report')
    def read_report(self, request, pk=None):
        if( pk == None):
            return HttpResponse()
        df = pd.DataFrame(list(self.queryset.filter(store=pk).values('item_name', 'amount', 'price')))
        items = df.item_name.unique()
        report = []
        for item in items:
            item_df = df[df.item_name==item]
            price = item_df.iloc[0].price
            amount = item_df.sum().amount
            report.append({
                "item_name": item,
                "total": price*amount,
                "amount": amount
                })
        return Response({"data":report})




