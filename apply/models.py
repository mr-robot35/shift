from django.db import models
from users.models import User
from shop.models import Shop

class Shift(models.Model):
    date = models.DateField()
    opening = models.TimeField()
    close = models.TimeField()
    confirm = models.BooleanField(default=False, )
    shop = models.ForeignKey(Shop, models.CASCADE)
    staff = models.ForeignKey(User, models.CASCADE)
