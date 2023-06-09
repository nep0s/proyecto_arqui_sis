from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from maps.models import Maps
from maps.serializers import MapSerializer, MapSerializer_workers, MapSerializer_detail, MapSerializer_detail_workers
from rest_framework.response import Response
import json
import requests
from users.models import User

@csrf_exempt
def map_list(request):
    """
    List all code snippets, or create a new snippet.
    """

    if request.method == 'GET':
        maps = Maps.objects.all().order_by('id')[0:3000]
        serializer = MapSerializer(maps, many=True)
        return JsonResponse({'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': serializer.data})

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MapSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def map_detail(request, id):

    if request.method == 'GET':
        maps_1 = Maps.objects.get(id=id)
        serializer = MapSerializer_detail(maps_1, many=False)
        print(serializer.data)
        return JsonResponse({'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': serializer.data})

    if request.method == 'POST':
        maps_2 = Maps.objects.all()[0:2000]
        serializer = MapSerializer_workers(maps_2, many=True)
        data = {"dicts": {}}
        count= 1
        data2 = json.dumps(serializer.data)
        data3 = json.loads(data2)
        #user = User.objects.get()
        #data["dicts"]["mail"] = user.mail

        for i in data3:
            data["dicts"][str(count)] = i
            count +=1
        url = 'http://proyecto-base-grupo-24-worker-1:8000/complejidad/{}'.format(id)
        x = requests.get(url, json =data, verify=False)
        if x.status_code == 201:
    #    redirect user to home page
	        return redirect('index')
            
        else:
            maps_1 = Maps.objects.get(id=id)
            data_1 = json.loads(x.text)
            maps_1.complejidad = data_1["complejidad"]
            maps_1.save()
        
        
            


        
            



