from django.urls import re_path
from django.views.decorators.csrf import csrf_exempt

from crux_app.views import upload_file

urlpatterns = [
    re_path(r'files/upload', csrf_exempt(upload_file)),
]
