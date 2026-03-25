from django.db import models


class Appointment(models.Model):
    """
    Modelo principal da agenda.

    Representa um compromisso simples de uso pessoal.
    Mantivemos os campos enxutos para focar no aprendizado do CRUD.
    """

    # Título/nome do compromisso
    title = models.CharField(max_length=150)

    # Descrição opcional com mais detalhes
    description = models.TextField(blank=True)

    # Data do compromisso
    date = models.DateField()

    # Hora do compromisso
    time = models.TimeField()

    # Permite marcar se a tarefa/agendamento foi concluído
    is_done = models.BooleanField(default=False)

    # Campos automáticos de auditoria
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Agendamento"
        verbose_name_plural = "Agendamentos"
        ordering = ["date", "time", "id"]

    def __str__(self):
        """
        Texto amigável usado no admin e em logs.
        """
        return f"{self.title} - {self.date} {self.time}"