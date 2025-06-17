from rest_framework import viewsets
from .models import RegistroDoctores, ReservaBox, ConsultarBoxConsultar, ConsultarBoxProcedimiento
from .serializers import *

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = RegistroDoctores.objects.all()
    serializer_class = RegistroDoctorSerializer

class ReservaBoxViewSet(viewsets.ModelViewSet):
    queryset = ReservaBox.objects.all()
    serializer_class = ReservaBoxSerializer

class ConsultarBoxConsultarViewSet(viewsets.ModelViewSet):
    queryset = ConsultarBoxConsultar.objects.all()
    serializer_class = ConsultarBoxConsultarSerializer

class ConsultarBoxProcedimientoViewSet(viewsets.ModelViewSet):
    queryset = ConsultarBoxProcedimiento.objects.all()
    serializer_class = ConsultarBoxProcedimientoSerializer

