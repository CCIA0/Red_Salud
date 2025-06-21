# api/models.py
from django.db import models

class Doctor(models.Model):
    nombre = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Box(models.Model):
    numero = models.IntegerField()
    doctor = models.ForeignKey('Doctor', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Box {self.numero}"

