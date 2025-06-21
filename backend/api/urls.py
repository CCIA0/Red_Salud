from django.urls import path
from .views import doctor_list, box_list

urlpatterns = [
    path('doctors/', doctor_list, name='doctor-list'),
    path('boxes/', box_list, name='box-list'),
]
