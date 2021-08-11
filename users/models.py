from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import  uuid
from shop.models import Shop


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        print('saved')

        return user

    def create_superuser(self, email, name, password, **extra_fields):
        user = self.create_user(email, name, password)
        user.is_admin = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        db_table = 'users_user'

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False, )
    name = models.CharField(verbose_name='name', max_length=200, )
    email = models.EmailField(verbose_name='email', max_length=200, unique=True, )
    is_staff = models.BooleanField(default=False, )
    is_active = models.BooleanField(default=True, )
    is_owner = models.BooleanField(default=False, )
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, blank=True, null=True, )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', ]

    def __str__(self):
        return self.name
    
    def get_username(self):
        return self.name

