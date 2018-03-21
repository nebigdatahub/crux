from django.contrib import admin
from .models import Dataset, DatasetFile

# Register your models here.


class DatasetAdmin(admin.ModelAdmin):
    pass


class DatasetFileAdmin(admin.ModelAdmin):
    pass


admin.site.register(Dataset)
admin.site.register(DatasetFile)
