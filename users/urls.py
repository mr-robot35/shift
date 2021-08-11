from django.urls import path
from  . import views


urlpatterns = [
    path('', views.UserTopView.as_view(), name='account_top'),
    path('signup/', views.SignupView.as_view(), name='signup'),
]
