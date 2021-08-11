from django import forms
from . import models
import datetime as dt

TIME_CHOICES = []
for h in range(24):
    for m in range(0, 59, 10):
        TIME_CHOICES.append([dt.time(h, m), '{:0>2}:{:0>2}'.format(h, m)])

class ShiftForm(forms.ModelForm):
    opening = forms.ChoiceField(
        choices=TIME_CHOICES,
        widget=forms.widgets.Select
    )
    close = forms.ChoiceField(
        choices=TIME_CHOICES,
        widget=forms.widgets.Select,
    )

    class Meta:
        model = models.Shift
        fields = ('opening', 'close',)
        widgets = {
            'date': forms.HiddenInput,
            'staff': forms.HiddenInput,
            'confirm': forms.HiddenInput,
        }


ShiftFormSet = forms.modelformset_factory(
    models.Shift,
    form=ShiftForm,
    fields=('opening', 'close', 'date', 'staff', 'confirm', 'confirm'),
    extra=0,
    can_delete=True,
    )

