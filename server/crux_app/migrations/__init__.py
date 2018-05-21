from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone

from ..models import (Dataset,
                      DatasetActivity,
                      Analysis,
                      AnalysisActivity,
                      Task,
                      TaskActivity)


@receiver(post_save, sender=Dataset)
def dataset_activity_on_create(instance, created, *args, **kwargs):
    if not created:
        return
    activity = DatasetActivity(
        by=instance.created_by,
        at=timezone.now(),
        act_type=DatasetActivity.CREATE
    )
    activity.save()


@receiver(post_save, sender=Analysis)
def analysis_activity_on_create(instance, created, *args, **kwargs):
    if not created:
        return
    activity = AnalysisActivity(
        by=instance.created_by,
        at=timezone.now(),
        act_type=AnalysisActivity.CREATE
    )


@receiver(post_save, sender=Task)
def task_activity_on_create(instance, created, *args, **kwargs):
    if not created:
        return
    activity = TaskActivity(
        by=instance.created_by,
        at=timezone.now(),
        act_type=TaskActivity.CREATE
    )
