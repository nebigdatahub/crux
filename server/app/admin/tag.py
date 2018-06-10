from django.contrib.admin import register, ModelAdmin

from ..models import Tag


@register(Tag)
class TagAdmin(ModelAdmin):
    list_display_links = ('id', 'text')
    list_display = ('id', 'text', 'content_type', 'created_by')
