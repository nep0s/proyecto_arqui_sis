
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template
# Third party imports.
from celery import shared_task


@shared_task
def calcular(todosserializer, serializer):
    suma = 0
    if len(todosserializer) < 1999:
        distancia = len(todosserializer)
    else:
        distancia = 1999
    for n in range(0, distancia):
        distancia = (abs((serializer['lat'] - todosserializer[n]['lat'])**2) + (abs(serializer['lon'] - todosserializer[n]['lon'])**2))**(1/2)
        nivel = todosserializer[n]['level']
        suma += ((nivel/100)*distancia)
    return suma










