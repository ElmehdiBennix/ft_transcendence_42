from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
# fron django.request import

from django.http import JsonResponse
from accounts.authenticate import CotumAuthentication

from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Tournament API",
        default_version='v1',
        description="API for the Tournament App",),
    public=True,
    permission_classes=(permissions.AllowAny,),
    # authentication_classes=(CotumAuthentication,),

)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-docs'),
    path('schema-viewer/', include('schema_viewer.urls')),
    path('prometheus/', include('django_prometheus.urls')),

    path('accounts/', include('accounts.urls'), name='accounts'),
    path('relations/', include('relations.urls'), name='relations'),
    path('chat/', include('chat.urls'), name='chat'),
    path('game/', include('game.urls'), name='game'),

    # path('health/', health_checkup, name='health_checkup'),
]

# TODO django would take resp of serving media files only in dev mode, and in production NGINX should serve them
if settings.DEBUG == True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
