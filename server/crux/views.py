from django.shortcuts import render
from django.http import HttpResponse
from crux.settings.common import BASE_DIR


def home(request):
    return render(request, 'index.html')


def notebook(request):
    from nbconvert import HTMLExporter

    with open(f"{BASE_DIR}/test.ipynb") as f:
        body, resources = HTMLExporter().from_file(f)

    return HttpResponse(body)
