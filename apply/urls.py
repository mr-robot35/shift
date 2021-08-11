from django.urls import path
from rest_framework import routers
from  . import views


urlpatterns = [
    path('', views.ShiftTopView.as_view(), name='shift_top'),
    path('submit/', views.SubmitView.as_view(), name='submit'),
    path('confirm/', views.ConfirmView.as_view(), name='confirm'),
]

app_name = 'apply'

router = routers.DefaultRouter()
router.register('shift', views.ShiftViewSet)
