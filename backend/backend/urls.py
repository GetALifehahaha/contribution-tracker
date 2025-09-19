from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #type:ignore

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view, name="register"),
    path('api/token/', TokenObtainPairView, name='get_token'),
    path('api/token/refresh', TokenRefreshView, name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
]
