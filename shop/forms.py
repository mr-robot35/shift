from django import forms
from . import models


class CreateShopForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs['class'] = 'form-control form-control-lg'
        self.fields['email'].widget.attrs['class'] = 'form-control form-control-lg'
        self.fields['tel'].widget.attrs['class'] = 'form-control form-control-lg'

    name = forms.CharField(
        label='SHOP',
        max_length=200,
    )
    email = forms.EmailField(
        label='EMAIL',
        max_length=200,
    )
    tel = forms.CharField(
        label='TEL',
        max_length=30,
    )

    class Meta:
        model = models.Shop
        fields = ['name', 'email', 'tel']

    def save(self, commit=True):
        name = self.cleaned_data.get('name')
        email = self.cleaned_data.get('email')
        tel = self.cleaned_data.get('tel')
        shop = models.Shop(name=name, email=email, tel=tel)
        shop.save()


class JoinShopForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['shop'].widget.attrs['class'] = 'form-control form-control-lg'
        self.fields['email'].widget.attrs['class'] = 'form-control form-control-lg'

    shop = forms.CharField(
        max_length=200, 
        required=False,
        label='SHOP',
    )
    email = forms.EmailField(
        required=False,
        label='EMAIL',
    )

    class Meta:
        model = models.Shop
        fields = ['shop', 'email']

    def clean_shop(self):
        shop_id = self.cleaned_data.get('shop')
        if shop_id == '':
            return shop_id

        if not models.Shop.objects.filter(uuid=shop_id).exists():
            raise forms.ValidationError('This Shop does not exist.')

        return shop_id

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email == '':
            return email

        if not models.Shop.objects.filter(email=email).exists():
            raise forms.ValidationError('This Shop does not exist.')

        return email
    
    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get('shop') == '' and cleaned_data.get('email') == '':
            raise forms.ValidationError('Input at least one filed.')

        return cleaned_data


