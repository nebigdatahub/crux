from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


class Task(models.Model):
    name = models.CharField(
        max_length=100,
        help_text=_('Required. 100 characters or fewer.')
    )

    description = models.CharField(
        max_length=500)

    dataset = models.ForeignKey(
        'Dataset',
        on_delete=models.CASCADE,
        related_name='tasks',
        blank=True,
        null=True)

    created_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        blank=True,
        related_name='tasks')

    REQUIRED_FIELDS = [dataset, created_by]
