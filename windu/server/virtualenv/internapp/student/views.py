from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def stuhome(request):
    data = {'message': 'Hello from Django'}
    return JsonResponse(data)