from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from . import forms
from . import models


class SignupView(generic.CreateView):
    template_name = 'users/signup.html'
    form_class = forms.CreateUserForm
    model = models.User

    def get_context_data(self):
        context = super().get_context_data()
        context['auth'] = self.request.user.is_authenticated

        return context

    def get_success_url(self):
        return reverse_lazy('login')
    
    def form_valid(self, form):
        form.save()
        return HttpResponseRedirect('/accounts/login')


class UserTopView(LoginRequiredMixin, generic.TemplateView):
    template_name = 'users/top.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = self.request.user
        context['user'] = user
        context['auth'] = self.request.user.is_authenticated

        return context


class HomeView(generic.TemplateView):
    template_name = 'users/home.html'

    def get_context_data(self):
        context = super().get_context_data()
        context['auth'] = self.request.user.is_authenticated
        
        return context

