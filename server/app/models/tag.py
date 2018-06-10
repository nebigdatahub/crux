from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from .activity import Activity


class Tag(models.Model):
    text = models.CharField(max_length=15)

    created_by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE
    )

    # Required fields for GenericRelation
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    REQUIRED_FIELDS = [text, created_by]

    class Meta:
        default_related_name = 'tags'
