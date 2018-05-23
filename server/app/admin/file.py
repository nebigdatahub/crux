from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from ..models import File


@admin.register(File)
class FileAdmin(GuardedModelAdmin):
    list_display = ('id', 'name', 'file', 'created_by', 'slug')
