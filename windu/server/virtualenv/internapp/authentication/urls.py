from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('', views.index),
    path('signupstu/', views.signupstudent),
    path('signinstu/', views.signinstudent),
    path('signupcomp/', views.signupcompany),
    path('signincomp/', views.signincompany),
    path('signout/', views.signout),
]