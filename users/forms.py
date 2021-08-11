from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.core.exceptions import ValidationError
from . import models

class CreateUserForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['class'] = 'form-control form-control-lg'
        self.fields['name'].widget.attrs['class'] = 'form-control form-control-lg'
        self.fields['password1'].widget.attrs['class'] = 'form-control form-control-lg'
        self.fields['password2'].widget.attrs['class'] = 'form-control form-control-lg'

    email = forms.EmailField(
        label='EMAIL',
        max_length=200,
    )
    name = forms.CharField(
        label='NAME',
        max_length=200,
    )
    password1 = forms.CharField(
        label='PASSWORD',
        widget=forms.PasswordInput
    )
    password2 = forms.CharField(
        label='PASSORD CONFIRMATION',
        widget=forms.PasswordInput
    )

    class Meta:
        model = models.User
        fields = ('email', 'name', )

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('name')
        password = self.cleaned_data.get('password1')
        user = models.User(name=username, email=email)
        user.set_password(password)
        user.save()
