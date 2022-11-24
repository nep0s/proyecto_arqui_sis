"""Users views."""
import datetime
import jwt
# Django REST Framework
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Serializers
from users.serializers import UserLoginSerializer, UserModelSerializer, UserSignUpSerializer

# Models
from users.models import User

import json
import requests
class UserViewSet(viewsets.GenericViewSet):

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer

    # Detail define si es una petición de detalle o no, en methods añadimos el método permitido, en nuestro caso solo vamos a permitir post
    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)


    @action(detail=False, methods=['post'])
    def signup(self, request):
        """User sign up."""
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        dataRoom = {
                    "userUUID":"2c9227a6-63a3-11ed-81ce-0242ac120002",
                    "permissions":"rw",
                     "level":100
                    }
        #Dar acceso a room general 
        url = 'http://proyecto-base-grupo-24-api:7777/rooms/1/members'
        x = requests.put(url, json =dataRoom, verify=False)
        print(x) 



        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def generateToken(self, request):

        print(request.headers)
        private_key = b"-----BEGIN RSA PRIVATE KEY-----\nMIIBOAIBAAJAaO29RHYer7j1oYOli5PpFXPSuZwy2Lvz2D1NKDyfWDHwWLgGiR2FnWGHfLas2Un2XKRPPgj8Q5DoyD6kIDjHJwIDAQABAkAz0XyPy7mZ1EDR0760cIZCRuHBMidWK3PfzV5GSbHzjovVrvQMMKxD49psFxFcllGGPPaJO4VhljirkhnjWHT5AiEArfRPNg9uo88ZkIupyYL/moJTF9mooACSA+j6QFcF2i0CIQCaaxhJel2W83rYg1yPRlCzmXgSLM9MUJJu4C23e9KfIwIgMk84IYBxFTsuP5nE7xzN49fRRFKU7EF9+VeGGNmSPbkCIFlLmO3Urw49mkpeHEZV+RECrGaGNxIAfc1UIdu65N9VAiB48oeA/BhoEg55BzB2SAptKipEDzVnxeViXp3GGPPTYg==\n-----END RSA PRIVATE KEY-----"
        public_key = b"-----BEGIN PUBLIC KEY-----\nMFswDQYJKoZIhvcNAQEBBQADSgAwRwJAaO29RHYer7j1oYOli5PpFXPSuZwy2Lvz2D1NKDyfWDHwWLgGiR2FnWGHfLas2Un2XKRPPgj8Q5DoyD6kIDjHJwIDAQAB\n-----END PUBLIC KEY-----"
        payload = { "exp": 1700776555,
         "iss": "grupo24",
         "aud": "grupox",
         "iat": datetime.datetime.now(tz=datetime.timezone.utc),
         "val": "True", 
         "sub": "uid"
         }
        print(payload)
        encoded = jwt.encode(payload, private_key, algorithm="RS256",headers={"kid": "123"})
        print(encoded, "hola")
        decoded = jwt.decode(encoded, public_key, algorithms=["RS256"])
        print(decoded) 

# "aud": "https://chat.nano.net",

        return Response({"Token": "token"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def getToken(self, request):
        public_key = b"-----BEGIN PUBLIC KEY-----\nMFswDQYJKoZIhvcNAQEBBQADSgAwRwJAaO29RHYer7j1oYOli5PpFXPSuZwy2Lvz2D1NKDyfWDHwWLgGiR2FnWGHfLas2Un2XKRPPgj8Q5DoyD6kIDjHJwIDAQAB\n-----END PUBLIC KEY-----"
        decoded = jwt.decode(request.data, public_key, algorithms=["RS256"])
        print(decoded) 

# "aud": "https://chat.nano.net",

        return Response(decoded, status=status.HTTP_201_CREATED)