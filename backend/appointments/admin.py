from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """
    Configuração de exibição do model no Django Admin.
    """

    list_display = (
        "id",
        "title",
        "date",
        "time",
        "is_done",
        "created_at",
    )
    list_filter = ("is_done", "date", "created_at")
    search_fields = ("title", "description")
    ordering = ("date", "time", "id")