from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Vacancy
from django.contrib.auth import authenticate, login, logout
from django.contrib.sessions.models import Session
from authentication.models import CustomUser
import json

# Create your views here.
# Retrieve user for session_id
def get_user_from_session(session_key):
    try:
        # Retrieve session from the database
        session = Session.objects.get(session_key=session_key)
        
        # Get the user ID associated with the session
        user_id = session.get_decoded().get('_auth_user_id')
        
        # Retrieve the user object using the user ID
        user = CustomUser.objects.get(pk=user_id)
        
        return user
    except (Session.DoesNotExist, CustomUser.DoesNotExist):
        return None

# View vacancy posts
@csrf_exempt
def viewvacancy(request):
    if request.method == "POST":
        # Access POST data
        json_data = json.loads(request.body)

        session_id = json_data.get('session_id')
        print(session_id)

        # Get the user ID associated with the session
        session_key = session_id
        
        # Get the user associated with the session
        user = get_user_from_session(session_key)

        if user:
            print(user.username)
            print(session_id)
            print(user.id)

            # Retrieve all vacancies from the database
            vacancies = Vacancy.objects.filter(user_id=user.id)
            
            # Iterate over the QuerySet and access the data
            for vacancy in vacancies:
                print(vacancy.company_name)
                print(vacancy.position)
                print(vacancy.description)
                print(vacancy.salary)
                print(vacancy.job_type)

            #session_id = request.session.session_key
            message_data = ['success', 'View posted vacancies', 'username', user.username]
            messages = {'message': message_data, 'session_id': session_id}
            return JsonResponse(messages)
        
        else:
            message_data = ['error', 'User not found or session expired']
            session_id = request.session.session_key
            messages = {'message': message_data, 'session_id': session_id}
            return JsonResponse(messages)
    
    else:
        message_data = ['error', 'System error']
        session_id = request.session.session_key
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)
    
# Create a vacancy post
@csrf_exempt
def postvacancy(request):
    if request.method == "POST":
        # Access POST data
        json_data = json.loads(request.body)

        session_id = json_data.get('session_id')
        company_name = json_data.get('company_name')
        company_address = json_data.get('company_address')
        position = json_data.get('position')
        description = json_data.get('description')
        salary = json_data.get('salary')
        job_type = json_data.get('job_type')

        # Get the user ID associated with the session
        session_key = session_id
        
        # Get the user associated with the session
        user = get_user_from_session(session_key)

        if user:
            print(user.username)
            print(company_name, company_address, position, description, salary, job_type)

            myvacancy = Vacancy.objects.create(
                company_name=company_name, 
                company_address=company_address, 
                position=position, 
                description=description, 
                salary=salary, 
                job_type=job_type,
                user_id=user.id
            )

            myvacancy.save()

            # session_id = request.session.session_key
            message_data = ['success', 'Your vacancy has been successfully saved', 'username', user.username]
            messages = {'message': message_data, 'session_id': session_id}
            return JsonResponse(messages)

        else:
            message_data = ['error', 'User not found or session expired']
            session_id = request.session.session_key
            messages = {'message': message_data, 'session_id': session_id}
            return JsonResponse(messages)
        
    else:
        message_data = ['error', 'Sign up - System error']
        session_id = request.session.session_key
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)
    