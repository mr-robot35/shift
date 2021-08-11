from users.models import User
from apply import serializer
from django.shortcuts import render
from django.views import generic
from django.http import HttpResponseRedirect
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, filters
from . import models, forms, serializer, filters
import json
import datetime as dt

class ShiftTopView(LoginRequiredMixin, generic.TemplateView):
    template_name = 'shift/top.html'

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if user.shop is None:
            return HttpResponseRedirect('/shop/create')

        submitted = models.Shift.objects.filter(staff=user)
        dates = []
        for sub in submitted:
            js = {
                'title': '{} to {}'.format(sub.opening.strftime('%H:%M'), sub.close.strftime('%H:%M')),
                'date': sub.date.day,
                'start': '{} {}'.format(sub.date.strftime('%Y-%m-%d'), sub.opening.strftime('%H:%M')),
                'end': '{} {}'.format(sub.date.strftime('%Y-%m-%d'), sub.close.strftime('%H:%M')),
                'color': '#ff0000' if sub.confirm else '#00ff00',
            }
            dates.append(js)

        context = self.get_context_data(**kwargs)
        context['date'] = json.dumps(dates)
        context['email'] = user.email

        return render(request, self.template_name, context)



class SubmitView(LoginRequiredMixin, generic.FormView):
    model = models.Shift
    template_name = 'shift/submit.html'
    form_class = forms.ShiftForm
    date_field = 'date'

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if user.shop is None:
            return HttpResponseRedirect('/shop/create')

        submitted = models.Shift.objects.filter(staff=user)
        dates, posts = [], {}
        for sub in submitted:
            js = {
                'title': '{} to {}'.format(sub.opening.strftime('%H:%M'), sub.close.strftime('%H:%M')),
                'date': sub.date.day,
                'start': '{} {}'.format(sub.date.strftime('%Y-%m-%d'), sub.opening.strftime('%H:%M')),
                'end': '{} {}'.format(sub.date.strftime('%Y-%m-%d'), sub.close.strftime('%H:%M')),
                'color': '#ff0000' if sub.confirm else '#00ff00',
            }
            dates.append(js)
            posts[str(sub.date)] = '{}-{}'.format(sub.opening.strftime('%H:%M:%S'), sub.close.strftime('%H:%M:%S'))

        formset = forms.ShiftFormSet(
            request.POST or None,
            queryset=models.Shift.objects.filter(staff=user),
        )

        context = self.get_context_data(**kwargs)
        context['date'] = json.dumps(dates)
        context['email'] = user.email
        context['formset'] = formset
        context['posts'] = json.dumps(posts)

        return render(request, self.template_name, context)

    def form_valid(self, form, context=None):
        return HttpResponseRedirect('/shift')

    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        req = request.POST
        posts = json.loads(req['posts'])
        formset = forms.ShiftFormSet(request.POST or None)

        if formset.is_valid():
            user = request.user
            shop = user.shop
            for i in range(int(req['form-TOTAL_FORMS'])):
                opening = req['form-{}-opening'.format(i)]
                close = req['form-{}-close'.format(i)]
                date = req['form-{}-date'.format(i)]
                if date in posts.keys():
                    if posts[date] != '{}-{}'.format(opening, close):
                        obj = models.Shift.objects.filter(
                            staff=user,
                            date=date,
                        )
                        obj.opening = opening
                        obj.close = close
                        obj.update()
                else:
                    models.Shift.objects.create(
                        date=date,
                        opening=opening,
                        close=close,
                        confirm=False,
                        shop=shop,
                        staff=user,
                    )

            return self.form_valid(formset, context)
        else:
            return self.form_invalid(formset)


class ConfirmView(LoginRequiredMixin, generic.FormView):
    template_name = 'shift/confirm.html'
    model = models.Shift
    form_class = forms.ShiftForm
    date_field = 'date'

    def get(self, request, *args, **kwargs):
        user = self.request.user
        if user.shop is None:
            return HttpResponseRedirect('/shop/create')

        dates, posts, staffs = [], {}, {}
        if not user.is_owner:
            return HttpResponseRedirect('/shift')

        submitted = models.Shift.objects.filter(shop=user.shop)
        staff_objs = User.objects.filter(shop=user.shop)
        for s in staff_objs:
            staffs[s.uuid] = s.name

        for sub in submitted:
            js = {
                'title': '{} to {} {}'.format(sub.opening.strftime('%H:%M'), sub.close.strftime('%H:%M'), staffs[sub.staff_id]),
                'date': sub.date.day,
                'start': '{} {}'.format(sub.date.strftime('%Y-%m-%d'), sub.opening.strftime('%H:%M')),
                'end': '{} {}'.format(sub.date.strftime('%Y-%m-%d'), sub.close.strftime('%H:%M')),
                'color': '#ff0000' if sub.confirm else '#00ff00',
            }
            dates.append(js)
            posts[sub.id] = '{}-{}'.format(sub.opening.strftime('%H:%M:%S'), sub.close.strftime('%H:%M:%S'))

        formset = forms.ShiftFormSet(
            request.POST or None,
            queryset=models.Shift.objects.filter(shop=user.shop),
        )

        context = self.get_context_data(**kwargs)
        context['date'] = json.dumps(dates)
        context['email'] = user.email
        context['formset'] = formset
        context['posts'] = json.dumps(posts)

        return render(request, self.template_name, context)

    def form_valid(self, form, context=None):
        return HttpResponseRedirect('/shift')

    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        req = request.POST
        posts = json.loads(req['posts'])
        formset = forms.ShiftFormSet(request.POST or None)

        if formset.is_valid():
            for i in range(int(req['form-TOTAL_FORMS'])):
                opening = req['form-{}-opening'.format(i)]
                close = req['form-{}-close'.format(i)]
                date = req['form-{}-date'.format(i)]
                confirm = req['form-{}-confirm'.format(i)]
                idx = req['form-{}-id'.format(i)]
                if idx in posts.keys():
                    if posts[idx] != '{}-{}'.format(opening, close) or confirm == 'true':
                        obj = models.Shift.objects.filter(id=idx).first()
                        obj.opening = dt.datetime.strptime(date + '/' + opening, '%Y-%m-%d/%H:%M:%S').time()
                        obj.close = dt.datetime.strptime(date + '/' + close, '%Y-%m-%d/%H:%M:%S').time()
                        if confirm in ('true', 'True'):
                            obj.confirm = True
                            obj.save()
                        elif confirm == 'False':
                            obj.confirm = False
                            obj.save()
                        else:
                            obj.delete()

            return self.form_valid(formset, context)
        else:
            return self.form_invalid(formset)


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = models.Shift.objects.all()
    serializer_class = serializer.ShiftSerializer
    filter_class = filters.ShiftFilter

