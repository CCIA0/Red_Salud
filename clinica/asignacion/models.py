from django.db import models

class ReservaBox(models.Model):
    doctor = models.ForeignKey('RegistroDoctores', on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    procedimiento = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.doctor.nombre} - {self.fecha} {self.hora_inicio}-{self.hora_fin}"

class ConsultarBoxConsultar(models.Model):
    especialidad = models.CharField(max_length=100)
    disponibilidad = models.BooleanField(default=True)

class ConsultarBoxProcedimiento(models.Model):
    procedimiento = models.CharField(max_length=100)
    duracion = models.IntegerField(help_text="Duración en minutos")

class RegistroDoctores(models.Model):
    nombre = models.CharField(max_length=100)
    especialidad = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)

    def __str__(self):
        return self.nombre

