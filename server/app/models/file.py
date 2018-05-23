import itertools

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from .user import User


class File(models.Model):
    name = models.CharField(
        max_length=100,
    )
    uploaded_by = models.ForeignKey(
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

    def save(self, *args, **kwargs):
        self.slug = self._slug(self.name)
        super().save(*args, *kwargs)

    def _slug(self, name):
        username = self.uploaded_by.username
        slug = final_slug = slugify(self.name)

        i = itertools.count(1)
        while(File.objects.filter(slug=final_slug).exists()):
            final_slug = f'{username}-__-{slug}{next(i)}'

        return final_slug
