from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet

# O router cria automaticamente as rotas REST do ViewSet
router = DefaultRouter()
router.register(r"appointments", AppointmentViewSet, basename="appointment")

urlpatterns = router.urls