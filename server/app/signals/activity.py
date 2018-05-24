from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from ..models import (Analysis,
                      Dataset,
                      Task,
                      Activity)


@receiver(post_save)
def log_activity(sender, instance, created, *args, **kwargs):
    if sender not in (Analysis, Dataset, Task):
        return
    if created:
        instance.activity.create(kind=Activity.CREATE, by=instance.created_by)
