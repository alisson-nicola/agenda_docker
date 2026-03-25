from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer converte o model para JSON e valida dados de entrada da API.
    """

    class Meta:
        model = Appointment
        fields = [
            "id",
            "title",
            "description",
            "date",
            "time",
            "is_done",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_title(self, value):
        """
        Validação simples para evitar título vazio com apenas espaços.
        """
        if not value or not value.strip():
            raise serializers.ValidationError("O título é obrigatório.")
        return value.strip()