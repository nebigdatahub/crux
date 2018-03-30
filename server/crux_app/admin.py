from django.contrib import admin
from .models import Dataset, File


class DatasetAdmin(admin.ModelAdmin):
    pass


class FileAdmin(admin.ModelAdmin):
    pass


admin.site.register(Dataset)
admin.site.register(File)
