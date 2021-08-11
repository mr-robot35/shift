from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from . import forms
from . import models
from users.models import User



class ShopTopView(LoginRequiredMixin, generic.TemplateView):
    template_name = 'shop/top.html'
    model = models.Shop

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if user.shop is None:
            return HttpResponseRedirect('join')

        return render(request, self.template_name, context=self.get_context_data(**kwargs))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        shop = models.Shop.objects.get(uuid=user.shop_id)
        staffs = User.objects.filter(shop=user.shop)

        context['user'] = user
        context['shop'] = shop
        context['staffs'] = staffs

        return context

class ShopCreateView(LoginRequiredMixin, generic.CreateView):
    template_name = 'shop/create.html'
    form_class = forms.CreateShopForm
    success_url = reverse_lazy('shop')

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        user = self.request.user
        if user.shop is not None:
            return HttpResponseRedirect('/shop')

        return render(request, self.template_name, {'form': form})

    def get_success_url(self):
        return reverse_lazy('shop')

    def form_valid(self, form):
        form.save()
        email = form.cleaned_data.get('email')
        shop = models.Shop.objects.get(email=email)
        user = self.request.user
        user.shop = shop
        user.is_owner = True
        user.save()
        return HttpResponseRedirect('/shop/')


class ShopJoinView(LoginRequiredMixin, generic.FormView):
    template_name = 'shop/join.html'
    form_class = forms.JoinShopForm

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        user = self.request.user
        if user.shop is not None:
            return HttpResponseRedirect('/shop')

        return render(request, self.template_name, {'form': form})

    def get_success_url(self):
        return reverse_lazy('shop')

    def form_valid(self, form):
        shop_id = form.cleaned_data.get('shop')
        email = form.cleaned_data.get('email')

        if shop_id is not None:
            shop = models.Shop.objects.get(uuid=shop_id)
        else:
            shop = models.Shop.objects.get(email=email)

        user = self.request.user
        user.shop = shop
        user.save()
        return HttpResponseRedirect('/shop/')
