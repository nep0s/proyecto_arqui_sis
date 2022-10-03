from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField


class Maps(models.Model):
   
    type1 = models.CharField(null=True, max_length=255)
    lat = models.FloatField(null=True)
    lon = models.FloatField(null=True)
    location = models.CharField(null=True, max_length=255)
    message = models.TextField(null =True, max_length=255)
    level = models.IntegerField(null = True)

    