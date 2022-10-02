from rest_framework import serializers
from maps.models import Maps
class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ['id', 'type1', 'lat', 'lon', 'location','message', 'level']