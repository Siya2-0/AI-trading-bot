# filepath: /c:/Users/Siya/Documents/Github/AI-trading-bot/ml_trader_project/accounts/views.py

from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
from django.contrib import messages
from .forms import CustomUserCreationForm


def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('login')
    else:
        form = CustomUserCreationForm()

    return render(request, 'accounts/signup.html',  {'form': form})

def login_view(request):
  
    if request.method == 'POST':
        username = request.POST["usernameInput"]
        password = request.POST["passwordInput"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render('signup')
        else:
            messages.error(request, "Unsuccessful login. Please check your email and password and try again.")
     
    return render(request, 'accounts/login.html', {})

def logout_view(request):
    #if request.method == 'POST':
    logout(request)
    return render(request, 'accounts/login.html', {})