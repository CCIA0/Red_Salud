from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, BoxViewSet, ReservaViewSet, ActividadViewSet

router = DefaultRouter()
router.register(r'doctores', DoctorViewSet)
router.register(r'boxes', BoxViewSet)
router.register(r'reservas', ReservaViewSet)
router.register(r'actividades', ActividadViewSet)

urlpatterns = router.urls
