import imp
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from .models import Note

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by("-updated")
    notes_serializer = NoteSerializer(notes, many=True)
    return Response(notes_serializer.data)

@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    note_serializer = NoteSerializer(note)
    return Response(note_serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body= data['body']
    )
    note_serializer = NoteSerializer(note, many=False)
    return Response(note_serializer.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    note_serializer = NoteSerializer(instance=note, data=data)
    
    if note_serializer.is_valid():
        note_serializer.save()
    
    return Response(note_serializer.data)

@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')