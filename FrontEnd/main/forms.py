from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm 
from django.core.exceptions import ValidationError  
from django.forms.fields import EmailField  
from django.forms.forms import Form  

class SignUpForm(UserCreationForm):
    mobile = forms.IntegerField() # newly added
    email = forms.EmailField(label='email')
    class Meta:
        model = User
        fields = ('username', 'mobile','email', 'password1', 'password2', )
        labels = {'mobile': 'Mobile Number'} # newly added

class LogInForm(forms.Form):
    email= forms.CharField(max_length=100)
    password= forms.CharField(max_length=100)
    