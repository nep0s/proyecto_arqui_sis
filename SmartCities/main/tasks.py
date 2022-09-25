import paho.mqtt.client as mqtt
from .models import Event
from celery import shared_task
import ast


def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)
    data = ast.literal_eval(message.payload.decode("utf-8"))
    Event.objects.create(type = data["type"], lat = data["lat"], lon = data["lon"], location = data["location"], message = data["message"], level = data["level"])
    
#######################################

@shared_task()
def receive_broker_task():
    print("creating new instance")
    broker_address="planetaryevents.iic2173.net"
    print("creating new instance")
    client = mqtt.Client("P1") #create new instance
    client.username_pw_set(username="common", password="iic2173")
    client.on_message=on_message #attach function to callback
    print("connecting to broker")
    client.connect(broker_address,port = 9000) #connect to broker
    client.loop_start() #start the loop
    print("Subscribing to topic","house/bulbs/bulb1")
    client.subscribe("global-emergencies")
    # print("Publishing message to topic","house/bulbs/bulb1")
    # client.publish("house/bulbs/bulb1","OFF")
    # client.loop_stop() #stop the loop









