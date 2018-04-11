from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from ..models import Dataset


@admin.register(Dataset)
class DatasetAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'name')
    list_display = ('id', 'name', 'owner', 'description')
