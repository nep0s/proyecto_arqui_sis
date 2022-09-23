from asyncio import events
from django.contrib import admin

# Register your models here.

from .models import Profile, Event
 
@admin.register(Profile)
class RequestDemoAdmin(admin.ModelAdmin):
  list_display = [field.name for field in
Profile._meta.get_fields()]
admin.site.register(Event)