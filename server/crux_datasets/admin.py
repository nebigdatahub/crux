from django.contrib import admin
from .models import Dataset


class DatasetAdmin(admin.ModelAdmin):
    pass


admin.site.register(Dataset)
