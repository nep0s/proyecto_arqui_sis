from email import message
from django.db import models

class complejidad(models.Model):
    type = models.CharField(max_length=100)
    lat = models.FloatField()
    lon = models.FloatField()
    location = models.CharField(max_length=100)
    message = models.CharField(max_length=100)
    level = models.IntegerField()

    def __str__(self):
        return self.message

