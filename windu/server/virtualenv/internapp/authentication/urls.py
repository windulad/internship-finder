from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('', views.home),
    path('signup/', views.signup),
    path('signin/', views.signin),
    path('signout/', views.signout),
]