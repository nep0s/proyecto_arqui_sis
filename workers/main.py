import os
from dotenv import load_dotenv

# FastAPI
from fastapi import FastAPI

# celery
from celery import Celery
from celery_config.tasks import wait_and_return
import requests
import json
from pydantic import BaseModel 


load_dotenv('.env')

app = FastAPI()

celery_app = Celery(
    __name__,
    # https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/index.html
    broker=os.environ.get('CELERY_BROKER_URL', ''),
    backend=os.environ.get('CELERY_RESULT_BACKEND', '')
)

# Setup to use all the variables in settings
# that begins with 'CELERY_'
celery_app.config_from_object('celery_config.config', namespace='CELERY')

@app.get("/")
def read_root():
    url = 'http://proyecto-base-grupo-24-web-1:9000/maps/'
    x = requests.get(url)
    return (json.loads(x.content))
    # return {"Hola"}


@app.get("/job/")
def get_execute_job():
    wait_and_return.delay(2,2)
    return {"job": "executed"}

class dicionario(BaseModel):
    dicts: dict


@app.get("/complejidad/{id}")
def get_complejidad(dicionario: dicionario, id: int):

  
    print("dicionario 2")
    print(dicionario)
    suma = 0 
    niv =[]
    lati = []
    long_1= []
    print(dicionario.dicts[str(id)]['level'])
    actual = [int(dicionario.dicts[str(id)]['level']), int(dicionario.dicts[str(id)]['lat']), int(dicionario.dicts[str(id)]['lon'])]
    for i in range(1, len(dicionario.dicts) + 1):
        if id != i:
      
            nivel = (dicionario.dicts[str(i)]['level'])
            lat = (dicionario.dicts[str(i)]['lat'])
            lon = (dicionario.dicts[str(i)]['lon'])
            if nivel!= None and lat !=None and lon!= None:
                niv.append(nivel)
                lati.append(lat)
                long_1.append(lon)
    wait_and_return.delay(niv, lati, long_1, actual)
    print("ya hice el jobbb")
    return {"job": "executed"}















    

