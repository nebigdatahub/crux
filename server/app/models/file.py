import itertools

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from django.contrib.contenttypes.fields import (GenericForeignKey,
                                                GenericRelation)
from django.contrib.contenttypes.models import ContentType

from .user import User
from .activity import Activity


class File(models.Model):
    name = models.CharField(
        max_length=100,
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    file = models.FileField()
    slug = models.SlugField(editable=False)

    # Fields for GenericRelation
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    REQUIRED_FIELDS = [file, slug]

    class Meta:
        default_related_name = 'files'
