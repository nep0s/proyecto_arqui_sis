from shutil import disk_usage
from django.http import JsonResponse
from .models import complejidad
from .serializers import complejidadSerializer
from .task import calcular, wait_and_return
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



@api_view(['GET', 'POST'])
def complejidad_list(request):

    if request.method == 'GET':
        complejidads = complejidad.objects.all()
        serializer = complejidadSerializer(complejidads, many=True)
        return JsonResponse(serializer.data, safe=False)


    elif request.method == 'POST':
        serializer = complejidadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)




@api_view(['GET', 'PUT', 'DELETE'])
def complejidad_detail(request, id):

    try:
        complejidads = complejidad.objects.get(id=id)
    except complejidad.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = complejidadSerializer(complejidads)
        suma = 0
        todos = complejidad.objects.all()
        todosserializer = complejidadSerializer(todos, many=True)  
        suma = 0
        print('este es ', todosserializer.data[1]['lat'])
        if len(todosserializer.data) < 1999:
            distancia = len(todosserializer.data)
        else:
            distancia = 1999
        for n in range(0, distancia):
            distancia = ((abs((serializer.data['lat'] - todosserializer.data[n]['lat'])**2) + (abs(serializer.data['lon'] - todosserializer.data[n]['lon'])**2))**(1/2))
            nivel = (todosserializer.data[n]['level'])
            suma = suma + calcular(nivel, distancia)
            #suma += (calcular.apply_async(nivel, distancia))
        return Response(suma)
    elif request.method == 'PUT':
        serializer = complejidadSerializer(complejidads, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        complejidads.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
@api_view(['GET'])
def heartbeat(request):
    wait_and_return.delay()
    return Response(True)




    







    




    



