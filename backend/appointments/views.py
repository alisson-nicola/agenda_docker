from rest_framework import viewsets
from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    ViewSet do DRF que já entrega CRUD completo automaticamente.

    Ele fornece:
    - GET lista
    - GET detalhe
    - POST criação
    - PUT atualização completa
    - PATCH atualização parcial
    - DELETE exclusão
    """

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer