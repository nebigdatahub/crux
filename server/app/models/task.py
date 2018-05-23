from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from .activity import Activity


class Task(models.Model):
    name = models.CharField(max_length=100)

    readme = models.TextField(
        null=False,
        blank=False
    )

    dataset = models.ForeignKey(
        'Dataset',
        on_delete=models.CASCADE
    )

    created_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE
    )

    activity = GenericRelation(Activity)

    REQUIRED_FIELDS = [dataset, created_by]

    class Meta:
        default_related_name = 'tasks'
