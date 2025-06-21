from rest_framework import viewsets
from .models import Doctor, Box, Reserva, Horario, Actividad
from .serializers import DoctorSerializer, BoxSerializer, ReservaSerializer, ActividadSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class BoxViewSet(viewsets.ModelViewSet):
    queryset = Box.objects.all().order_by('id')
    serializer_class = BoxSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all().order_by('id')
    serializer_class = ActividadSerializer


