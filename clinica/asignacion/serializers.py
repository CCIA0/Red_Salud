from rest_framework import serializers
from .models import RegistroDoctores, ReservaBox, ConsultarBoxConsultar, ConsultarBoxProcedimiento

class RegistroDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroDoctores
        fields = '__all__'

class ReservaBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaBox
        fields = '__all__'

class ConsultarBoxConsultarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultarBoxConsultar
        fields = '__all__'

class ConsultarBoxProcedimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultarBoxProcedimiento
        fields = '__all__'
