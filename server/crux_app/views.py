from django.http import JsonResponse
from django import forms
from django.contrib.auth.decorators import login_required

from .models import *


# class FileForm(forms.ModelForm):
#     class Meta:
#         model = File
#         fields = ['dataset', 'file']


@login_required
def upload_file(request):
    return JsonResponse({"error": "Not implemented"})
#     if request.method != 'POST':
#         response = JsonResponse(
#             {"error": f"Cannot {request.method} on this path"})
#         response.status_code = 400
#         return response

#     print(request.POST)
#     dataset = Dataset.objects.get(pk=request.POST['dataset'])
#     print(request.user)

#     form = FileForm(request.POST, request.FILES)

#     if form.is_valid():
#         file = form.save(commit=False)
#         file.owner = request.user
#         form.save()
#         response = JsonResponse({"status": "SUCCESS"})
#         return response
#     else:
#         print(form.errors)
#         response = JsonResponse({"status": "FAIL"})
#         response.status_code = 400
#         return response
