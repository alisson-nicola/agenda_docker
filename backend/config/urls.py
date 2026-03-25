from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def healthcheck(request):
    """
    Endpoint simples para validar se a API está viva.
    """
    return JsonResponse({"status": "ok", "service": "backend"})


urlpatterns = [
    path("admin/", admin.site.urls),

    # Endpoint básico de saúde da aplicação
    path("api/health/", healthcheck),

    # Rotas do CRUD da agenda
    path("api/", include("appointments.urls")),
]