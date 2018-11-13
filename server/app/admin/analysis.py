from django.contrib.admin import register, ModelAdmin

from ..models import Analysis


@register(Analysis)
class AnalysisAdmin(ModelAdmin):
    list_display_links = ('id', 'name', 'slug',)
    list_display = ('id', 'name', 'slug', 'created_by', 'readme',)
