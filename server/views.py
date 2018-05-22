from django.shortcuts import render
from django.http import HttpResponse
from settings.common import BASE_DIR


def home(request):
    return render(request, 'index.html')
