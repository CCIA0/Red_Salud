from rest_framework import serializers
from .models import Doctor, Box, Horario, Reserva, Actividad

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'nombre', 'especialidad']

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = ['id', 'nombre']

class BoxSerializer(serializers.ModelSerializer):
    actividad = ActividadSerializer(read_only=True)  # Para mostrar nombre y id
    actividad_id = serializers.PrimaryKeyRelatedField(
        queryset=Actividad.objects.all(),
        source='actividad',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Box
        fields = ['id', 'codigo', 'actividad', 'actividad_id']  # Asegúrate de incluir 'codigo'

class HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario
        fields = ['id', 'doctor', 'dia', 'hora_inicio', 'hora_fin', 'actividad']

class ReservaSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)
    box = serializers.PrimaryKeyRelatedField(queryset=Box.objects.all())
    box_detail = BoxSerializer(source='box', read_only=True)
    actividad = ActividadSerializer(read_only=True)
    actividad_id = serializers.PrimaryKeyRelatedField(
        queryset=Actividad.objects.all(),
        source='actividad',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Reserva
        fields = [
            'id',
            'doctor',
            'doctor_detail',
            'box',
            'box_detail',
            'fecha',
            'hora_inicio',
            'hora_fin',
            'actividad',
            'actividad_id'
        ]
