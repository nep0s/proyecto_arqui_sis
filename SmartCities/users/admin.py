"""User admin classes."""

# Django
from django.contrib import admin

# Models
from users.models import User

def index(request):

    return HttpResponse("Hello, world")

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """User admin."""

    list_display = ('pk', 'username', 'email',)
    list_display_links = ('pk', 'username', 'email',)

    search_fields = (
        'email',
        'username',

    )

    list_filter = (
        'is_active',
        'is_staff',
        'date_joined',
        'modified',
    )

    readonly_fields = ('date_joined', 'modified',)