from django.contrib.admin import register, ModelAdmin

from ..models import Task


@register(Task)
class TaskAdmin(ModelAdmin):
    pass
