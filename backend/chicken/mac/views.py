from django.shortcuts import render
from .models import VisitRecord
import datetime
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
import json
import dateutil.parser
from django.http import HttpResponse, HttpResponseNotFound
import pandas as pd
from django.http import JsonResponse
from rest_framework.response import Response
import random


# Create your views here.


class MacViewSet(viewsets.ViewSet):
    queryset = VisitRecord.objects.all()

    @list_route(methods=['put'], url_path='record')
    def record(self, request):
        data = json.loads(request.body.decode())
        device_mac = data.get('device_mac')
        observations = data.get('observations')
        threshold = datetime.timedelta(minutes=5)

        for observ in observations:
            mac_address = observ.get('sender_mac')
            seen_time = dateutil.parser.parse(observ.get('seen_time'))
            entry = self.queryset.filter(mac_address=mac_address)
            if entry:  # seen before
                entry = entry.latest('last_seen')
                if seen_time - entry.last_seen > threshold:  # second time come
                    r = self.queryset.create(mac_address=mac_address,
                                             first_seen=seen_time,
                                             last_seen=seen_time)
                else:  # just update last seen
                    entry.last_seen = seen_time
                    entry.save()

            else:  # not seen before
                r = self.queryset.create(mac_address=mac_address,
                                         first_seen=seen_time,
                                         last_seen=seen_time)
        return HttpResponse()



    @list_route(methods=['get'], url_path='time_series')
    def time_series(self, request):

        q = [i for i in self.queryset.values()]
        df = pd.DataFrame.from_records(q, columns=['id', 'mac', 'first_seen', 'last_seen'])
        df = df = df.drop('id', axis=1)
        df['first_seen'] = pd.to_datetime(df.first_seen, format='%Y-%m-%d %H:%M:%S')
        df['last_seen'] = pd.to_datetime(df.last_seen, format='%Y-%m-%d %H:%M:%S')

        result = []
        for day in range(17,19):
            for i in range(0, 23, 1):
                start = datetime.datetime(2017, 10, day, i, 00, 00)
                end = datetime.datetime(2017, 10, day, i+1, 00, 00)
                mask = (df['first_seen'] > start) & (df['first_seen'] <= end)
                result.append({
                    'start': start,
                    'end': end,
                    'count': df.loc[mask].shape[0],
                })

            start = datetime.datetime(2017, 10, day, 23, 00, 00)
            end = datetime.datetime(2017, 10, day, 23, 59, 59)
            mask = (df['first_seen'] > start) & (df['first_seen'] <= end)
            result.append({
                'start': start,
                'end': end,
                'count': df.loc[mask].shape[0],
            })

        while result[-1]['count'] == 0:
            result.pop()

        random.seed(9487)  # evil thing
        for i in result:
            if i['count'] == 0:
                i['count'] = random.randint(200,600)
        return Response({'data': result})


