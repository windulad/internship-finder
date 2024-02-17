from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth.models import User
from .models import CustomUser
from django.contrib.auth import authenticate, login, logout
import json

# Create your views here.
@csrf_exempt
def index(request):
    data = {'message': 'Home'}
    return JsonResponse(data)
    
# Handling student - sign up
@csrf_exempt
def signupstudent(request):
    if request.method == "POST":
        # Access POST data
        json_data = json.loads(request.body)

        username = json_data.get('username')
        fname = json_data.get('fname')
        lname = json_data.get('lname')
        email = json_data.get('email')
        password1 = json_data.get('password1')
        password2 = json_data.get('password2')

        type = 'student'

        print(username, fname, lname, email, password1, password2, type)

        if CustomUser.objects.filter(username=username).exists():
            message_data = ['error', 'Username already exists! Please try some other username']
            session_id = request.session.session_key

        elif len(username) > 12:
            message_data = ['error', 'Username is too long']
            session_id = request.session.session_key

        elif password1 != password2:
            message_data = ['error', 'Passwords do not match!']
            session_id = request.session.session_key

        else:
            myuser = CustomUser.objects.create_user(username=username, email=email, password=password1)
            myuser.first_name = fname
            myuser.last_name = lname
            myuser.type = type

            myuser.save()

            user = authenticate(username=username, password=password1)

            if user is not None:
                login(request, user)

                #message_data = ['success', 'Login success']
                session_id = request.session.session_key

            message_data = ['success', 'Your account has been successfully created']
            #session_id = request.session.session_key
            
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)

    else:
        message_data = ['error', 'Sign up - System error']
        session_id = request.session.session_key
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)
    
# Handling student - sign in
@csrf_exempt
def signinstudent(request):
    if request.method == 'POST':
        # Access POST data
        json_data = json.loads(request.body)

        username = json_data.get('username')
        password1 = json_data.get('password1')

        user = authenticate(username=username, password=password1)

        if user is not None:
            login(request, user)

            message_data = ['success', 'Login success']
            session_id = request.session.session_key
            
            messages = {'message': message_data, 'session_id': session_id}
            return JsonResponse(messages)
        
    else:
        message_data = ['error', 'Sign in - System error']
        session_id = request.session.session_key
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)

# Handling company - sign up
@csrf_exempt
def signupcompany(request):
    if request.method == "POST":
        # Access POST data
        json_data = json.loads(request.body)

        username = json_data.get('username')
        fname = json_data.get('fname')
        lname = json_data.get('lname')
        email = json_data.get('email')
        password1 = json_data.get('password1')
        password2 = json_data.get('password2')

        type = 'company'

        print(username, fname, lname, email, password1, password2, type)

        if CustomUser.objects.filter(username=username).exists():
            message_data = ['error', 'Username already exists! Please try some other username']
            session_id = request.session.session_key

        elif len(username) > 12:
            message_data = ['error', 'Username is too long']
            session_id = request.session.session_key

        elif password1 != password2:
            message_data = ['error', 'Passwords do not match!']
            session_id = request.session.session_key

        else:
            mycompany = CustomUser.objects.create_user(username=username, email=email, password=password1)
            mycompany.first_name = fname
            mycompany.last_name = lname
            mycompany.type = type
            
            mycompany.save()

            user = authenticate(username=username, password=password1)

            if user is not None:
                login(request, user)

                #message_data = ['success', 'Login success']
                session_id = request.session.session_key

            message_data = ['success', 'Your account has been successfully created']
            session_id = request.session.session_key
            
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)

    else:
        message_data = ['error', 'Sign up - System error']
        session_id = request.session.session_key
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)
    
# handling company - sign in
@csrf_exempt
def signincompany(request):
    if request.method == 'POST':
        # Access POST data
        json_data = json.loads(request.body)

        username = json_data.get('username')
        password1 = json_data.get('password1')

        user = authenticate(username=username, password=password1)

        if user is not None:
            login(request, user)

            message_data = ['success', 'Login success']
            session_id = request.session.session_key
            
            messages = {'message': message_data, 'session_id': session_id}
            return JsonResponse(messages)
        
    else:
        message_data = ['error', 'Sign in - System error']
        session_id = request.session.session_key
        messages = {'message': message_data, 'session_id': session_id}
        return JsonResponse(messages)


@csrf_exempt
def signout(request):
    logout(request) 
    # Clear the user's session
    request.session.flush()

    message_data = ['success', 'Log out success']
    messages = {'message': message_data}
    return JsonResponse(messages)