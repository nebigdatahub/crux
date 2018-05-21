from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from .activity import DatasetActivity


class Dataset(models.Model):
    name = models.CharField(
        max_length=100,
        help_text=_('Required. 100 characters or fewer.')
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

    REQUIRED_FIELDS = [name, created_by]

    def _slug(self):
        username = self.created_by.get_username()
        slug = f'{username}-{slugify(self.name)}'

        for i in itertools.count(1):
            if not Dataset.objects.filter(slug=slug).exists():
                break
            else:
                slug = f'{slug}-{i}'
        return slug

    def save(self, *args, **kwargs):
        self.slug = self._slug()

        if not self.id:
            self.create
        super().save(*args, **kwargs)

    class Meta:
        default_related_name = 'datasets'
