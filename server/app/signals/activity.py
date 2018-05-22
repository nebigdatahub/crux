from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from ..models import (Analysis, AnalysisActivity, Dataset, DatasetActivity,
                      Task, TaskActivity)


@receiver(post_save, sender=Dataset)
def log_dataset_activity(instance, created, *args, **kwargs):
    if created:
        activity = DatasetActivity(
            by=instance.created_by,
            act_type=DatasetActivity.CREATE,
            on=instance
        )
        activity.save()


@receiver(post_save, sender=Analysis)
def log_analysis_activity(instance, created, *args, **kwargs):
    if created:
        activity = AnalysisActivity(
            by=instance.created_by,
            act_type=AnalysisActivity.CREATE,
            on=instance
        )
        activity.save()


@receiver(post_save, sender=Task)
def log_task_activity(instance, created, *args, **kwargs):
    if created:
        activity = TaskActivity(
            by=instance.created_by,
            act_type=TaskActivity.CREATE,
            on=instance
        )
        activity.save()
