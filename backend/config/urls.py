from django.contrib import admin
from django.http import JsonResponse
from django.urls import path

# Endpoint simples de teste para confirmar que a API está viva
def healthcheck(request):
    return JsonResponse({"status": "ok", "service": "backend"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", healthcheck),
]