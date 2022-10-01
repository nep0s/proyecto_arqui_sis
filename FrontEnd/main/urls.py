from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path("login/", views.login_request, name="login"),
    path("detail/<int:id>", views.event_detail, name="detail")

]