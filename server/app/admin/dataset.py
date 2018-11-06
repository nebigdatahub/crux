from django.contrib.admin import register, ModelAdmin

from ..models import Dataset


@register(Dataset)
class DatasetAdmin(ModelAdmin):
    ModelAdmin.list_display_links = ('id', 'name')
    ModelAdmin.list_display = ('id', 'name', 'created_by')
