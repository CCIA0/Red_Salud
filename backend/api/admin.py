from django.contrib import admin
from .models import Doctor, Box, Actividad, Reserva

admin.site.register(Doctor)
admin.site.register(Actividad)
admin.site.register(Box)
admin.site.register(Reserva)
