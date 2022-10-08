from rest_framework import serializers
from .models import complejidad

class complejidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = complejidad
        fields = ('id', 'type', 'lat', 'lon', 'location', 'message', 'level')