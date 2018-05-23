from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from ..models import Activity


@admin.register(Activity)
class ActivityAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'kind')
    list_display = ('id', 'content_type', 'kind', 'by', 'at')
