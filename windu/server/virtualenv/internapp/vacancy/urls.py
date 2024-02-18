from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('viewvacancy/', views.viewvacancy),
    path('postvacancy/', views.postvacancy),
]