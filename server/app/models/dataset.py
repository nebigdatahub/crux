import itertools

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.fields import GenericRelation

from .activity import Activity
from .file import File


class Dataset(models.Model):
    name = models.CharField(
        max_length=100,
    )

    readme = models.TextField(
        null=True,
        blank=True)

    slug = models.SlugField(
        unique=True,
        editable=False)

    created_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        blank=True
    )

    files = GenericRelation(File)
    activity = GenericRelation(Activity)

    REQUIRED_FIELDS = [name, created_by]

    class Meta:
        default_related_name = 'datasets'
