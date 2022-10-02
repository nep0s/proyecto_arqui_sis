
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate,login
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm 
from django.contrib.auth.decorators import login_required
from .forms import SignUpForm, LogInForm
import ast
import time
import json
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

import requests


def index(request):

    #url = 'http://localhost:8000/maps/'
    url = 'http://proyecto-base-grupo-24-web-1:8000/maps/'
    x = requests.get(url)
    #print(x.content)
    
    ob = json.loads(x.content)
    print(ob)

    user_list = ob
    
    # user_list = {}
    page = request.GET.get('page', 1)

    paginator = Paginator(user_list, 25)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)

    return render(request=request,template_name='main/index.html', context= { 'users': users })
    #return render(request=request,template_name='main/index.html', context= { })

 
def event_detail(request, id):
    obj = Event.objects.get(pk=id)
    print("HOLAAAA", id)
    return render(request=request,template_name='main/event_detail.html',context= {'id': obj})

    
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        
        url = 'http://proyecto-base-grupo-24-web-1:8000/users/signup/'
        myobj ={"password":request.POST.get('password1'),"password_confirmation":request.POST.get('password2'),
        "first_name":request.POST.get('username'),"last_name":request.POST.get('username'),"email":request.POST.get('email'),"username": request.POST.get('username')}

        x = requests.post(url, json = myobj , verify=False)

        print(x.status_code)
        if x.status_code == 201:
        # redirect user to home page
            return redirect('index')
        else:
            print(x.text)
    else:
        form = SignUpForm()
    return render(request, 'main/signup.html', {'form': form})

def login_request(request):
	if request.method == "POST":
		form = LogInForm(request.POST)
		print(request.POST.get('username'))
		username = request.POST.get('email')
		password = request.POST.get('password')
		url = 'http://proyecto-base-grupo-24-web-1:8000/users/login/'
		myobj ={"password":password,"email": username}
		x = requests.post(url, json = myobj , verify=False)
		if x.status_code == 201:
    #    redirect user to home page
			return redirect('index')
            
		else:
			print(x.text)
			messages.error(request,"Invalid username or password.")
	else:
		form = LogInForm()
	return render(request=request, template_name="main/login.html", context={"login_form":form})
	