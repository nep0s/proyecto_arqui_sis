from rest_framework import serializers
from maps.models import Maps
class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['id', 'type1', 'lat', 'lon', 'location','message', 'level']

class MapSerializer_workers(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['level', 'lat', 'lon']
        

class MapSerializer_detail(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['id', 'type1', 'lat', 'lon', 'location','message', 'level', 'complejidad']

class MapSerializer_detail_workers(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['complejidad']
