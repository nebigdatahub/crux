from django.contrib import admin
from .models import Dataset, File, Task


class DatasetAdmin(admin.ModelAdmin):
    pass


class FileAdmin(admin.ModelAdmin):
    pass


class TaskAdmin(admin.ModelAdmin):
    pass


admin.site.register(Dataset)
admin.site.register(File)
admin.site.register(Task)
