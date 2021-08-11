from django.db import models
import  uuid


class Shop(models.Model):
    uuid = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False, )
    name = models.CharField(verbose_name='Shop name', max_length=200, )
    email = models.EmailField(verbose_name='Email', max_length=200, unique=True, )
    tel = models.CharField(verbose_name='Tel', max_length=30, )

    def __str__(self):
        return self.name

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'name', 'tel']
