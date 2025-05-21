from rest_framework import serializers
from .models import Doctor, Box

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'nombre', 'especialidad']

class BoxSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)  # incluye datos del doctor relacionado o null

    class Meta:
        model = Box
        fields = ['id','doctor']
