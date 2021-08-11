from django.urls import path
from  . import views


urlpatterns = [
    path('', views.ShopTopView.as_view(), name='top'),
    path('create/', views.ShopCreateView.as_view(), name='create'),
    path('join/', views.ShopJoinView.as_view(), name='join'),
]
