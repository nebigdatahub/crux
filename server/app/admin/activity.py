from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from ..models import Activity


@admin.register(Activity)
class ActivityAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'at', 'kind')
    list_display = ('id', 'at', 'kind', 'by')
