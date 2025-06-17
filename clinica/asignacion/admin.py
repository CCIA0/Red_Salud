from django.contrib import admin
from .models import ReservaBox, ConsultarBoxConsultar, ConsultarBoxProcedimiento, RegistroDoctores

admin.site.register(ReservaBox)
admin.site.register(ConsultarBoxConsultar)
admin.site.register(ConsultarBoxProcedimiento)
admin.site.register(RegistroDoctores)
