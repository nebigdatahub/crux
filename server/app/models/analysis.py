import itertools

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from .dataset import Dataset
from .task import Task
from .user import User


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

    REQUIRED_FIELDS = [name, created_by, dataset]

    def _slug(self):
        username = self.created_by.username
        slug = f'{username}-{slugify(self.name)}'

        i = itertools.count(1)
        while(Analysis.objects.filter(slug=slug).exists()):
            slug = f'{username}-__-{slugify(self.name)}{next(i)}'
        return slug

    def save(self, *args, **kwargs):
        self.slug = self._slug()
        super().save(*args, **kwargs)

    class Meta:
        default_related_name = 'analyses'
        verbose_name_plural = 'Analyses'
