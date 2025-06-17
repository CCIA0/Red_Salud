from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'doctores', DoctorViewSet)
router.register(r'reservas', ReservaBoxViewSet)
router.register(r'consultas', ConsultarBoxConsultarViewSet)
router.register(r'procedimientos', ConsultarBoxProcedimientoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
