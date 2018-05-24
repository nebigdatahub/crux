from django.contrib.admin import register, ModelAdmin

from ..models import File


@register(File)
class FileAdmin(ModelAdmin):
    list_display_links = ('id', 'name', 'slug')
    list_display = ('id', 'name', 'slug', 'content_type', 'file', 'created_by')
