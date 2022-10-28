
from time import time
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template
from celery import shared_task
from datetime import datetime

from celery import Celery
from celery import task  

celery = Celery('task')


@shared_task
def calcular(nivel, distancia):
    suma = ((nivel/100)*distancia)
    return suma

@shared_task
def wait_and_return():
    time.sleep(20)
    return 'Hello World!'









