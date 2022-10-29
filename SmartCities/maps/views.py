from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from maps.models import Maps
from maps.serializers import MapSerializer
from rest_framework.response import Response
import json

# Auth0


from functools import wraps
import jwt

from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope


@api_view(['GET'])
@csrf_exempt
def map_list(request):
    """
    List all code snippets, or create a new snippet.
    """

    if request.method == 'GET':
        maps = Maps.objects.all()
        serializer = MapSerializer(maps, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MapSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
@csrf_exempt
def map_detail(request, id):


    if request.method == 'GET':
        maps_1 = Maps.objects.get(id=id)
        serializer = MapSerializer(maps_1, many=False)
        return JsonResponse(serializer.data, safe=False)
