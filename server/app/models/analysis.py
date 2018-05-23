import itertools

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from .dataset import Dataset
from .file import File
from .task import Task
from .user import User
from .activity import Activity


class Analysis(models.Model):
    name = models.CharField(
        max_length=100,
    )

    readme = models.TextField(
        null=True,
        blank=True
    )

    slug = models.SlugField(
        unique=True,
        editable=False
    )

    dataset = models.ForeignKey(
        Dataset,
        on_delete=models.CASCADE,
        blank=True
    )

    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True
    )

    files = GenericRelation(File)
    activity = GenericRelation(Activity)

    REQUIRED_FIELDS = [name, created_by, dataset]

    class Meta:
        default_related_name = 'analyses'
        verbose_name_plural = 'Analyses'
