from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

from .activity import Activity
from .file import File
from .tag import Tag


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
    tags = GenericRelation(Tag)

    REQUIRED_FIELDS = [name, created_by]

    class Meta:
        default_related_name = 'datasets'
        unique_together = ('created_by', 'slug')
