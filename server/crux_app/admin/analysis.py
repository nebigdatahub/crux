from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from ..models import Analysis


@admin.register(Analysis)
class AnalysisAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'name')
    list_display = ('id', 'name', 'owner', 'description')
