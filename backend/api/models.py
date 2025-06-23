# api/models.py
from django.db import models

class Doctor(models.Model):
    nombre = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
        
class Actividad(models.Model):
    nombre = models.CharField(max_length=50)  # Ej: Consulta, Procedimiento

    def __str__(self):
        return self.nombre
        
    class Meta:
        verbose_name_plural = "Actividades"

class Box(models.Model):
    codigo = models.IntegerField(null=True, blank=True, unique=True)  # número que tú defines y muestras
    actividad = models.ForeignKey(Actividad, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Box {self.codigo if self.codigo is not None else self.id}"


class Horario(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    dia = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    actividad = models.ForeignKey(Actividad, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.doctor} - {self.dia} ({self.hora_inicio} - {self.hora_fin})"

class Reserva(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    box = models.ForeignKey(Box, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    actividad = models.ForeignKey(Actividad, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"Reserva {self.box} - {self.fecha} ({self.hora_inicio}-{self.hora_fin})"

