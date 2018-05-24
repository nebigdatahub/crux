from django.contrib.admin import register, ModelAdmin

from ..models import Activity


@register(Activity)
class ActivityAdmin(ModelAdmin):
    list_display_links = ('id', 'kind')
    list_display = ('id', 'content_type', 'kind', 'by', 'at')
