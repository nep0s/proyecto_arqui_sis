# celery
from celery import shared_task
import json
import requests

# standard
import time

# The "shared_task" decorator allows creation
# of Celery tasks for reusable apps as it doesn't
# need the instance of the Celery app.
# @celery_app.task()
@shared_task()
def add(x, y):
    return x + y

@shared_task
def kenobi():
    print("Hello there!")

@shared_task
def grievous():
    print('General Kenobi!')

@shared_task
def wait_and_return(nivel, lati, long, actual):
    suma = 0 
    for i in range(len(nivel)):
        distancia = ((lati[i] - actual[1])**2 + (long[i] - actual[2])**2)**(1/2)
        resultado = (nivel[i] / 100) * distancia
        suma += resultado
    print(f'La complejidad de este evento es {suma}')
    return suma






