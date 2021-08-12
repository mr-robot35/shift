from django.contrib import admin
from django.urls import path, include
from apply.urls import router
from users.views import HomeView


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('users.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('shop/', include('shop.urls')),
    path('shift/', include('apply.urls')),
    path('api/', include(router.urls)),
]
