from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from ..models import DatasetActivity, AnalysisActivity, TaskActivity


@admin.register(AnalysisActivity)
class AnalysisActivityAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'on', 'at', 'act_type')
    list_display = ('id', 'on', 'at', 'act_type')


@admin.register(DatasetActivity)
class DatasetActivityAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'on', 'at', 'act_type')
    list_display = ('id', 'on', 'at', 'act_type')


@admin.register(TaskActivity)
class TaskActivityAdmin(GuardedModelAdmin):
    list_display_links = ('id', 'on', 'at', 'act_type')
    list_display = ('id', 'on', 'at', 'act_type')
