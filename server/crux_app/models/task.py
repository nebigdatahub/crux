from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from . import Dataset


class Task(models.Model):
    name = models.CharField(
        _('name'),
        max_length=100,
        help_text=_('Required. 100 characters or fewer.')
    )

    dataset = models.ForeignKey(Dataset,
                                on_delete=models.CASCADE,
                                blank=True,
                                null=True),

    created_by = models.ForeignKey(get_user_model(),
                                   on_delete=models.CASCADE,
                                   related_name='created_by')

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    users = models.ManyToManyField(get_user_model(),
                                   related_name="tasks",
                                   )

    REQUIRED_FIELDS = [dataset, created_by]
