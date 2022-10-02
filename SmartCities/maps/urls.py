"""Experience URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from maps import views

router = DefaultRouter()
router.register(r'maps', views.map_list, basename='maps')

urlpatterns = [
    path('maps/', views.map_list),
    path('maps/<int:id>', views.map_detail),

]