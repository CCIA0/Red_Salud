from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Doctor, Box
from .serializers import DoctorSerializer, BoxSerializer

@api_view(['GET'])
def doctor_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def box_list(request):
    boxes = Box.objects.all()
    serializer = BoxSerializer(boxes, many=True)
    return Response(serializer.data)
