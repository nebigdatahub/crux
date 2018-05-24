import itertools
import os

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify

from ..models import Activity, Analysis, Dataset, File, Task


@receiver(post_save)
def on_create(sender, instance, created, *args, **kwargs):
    if sender not in (Analysis, Dataset, File, Task):
        return
    if created:
        _log_activity(sender, instance)
        _generate_slug(sender, instance)
        if sender == File:
            _generate_filename(sender, instance)


def _log_activity(sender, instance):
    if sender == File:
        return
    instance.activity.create(kind=Activity.CREATE, by=instance.created_by)


def _generate_slug(sender, instance):
    if sender == Task:
        return
    if instance.slug:
        return
    user = instance.created_by
    slug = final_slug = f'{slugify(instance.name)}'

    i = itertools.count(1)
    while(sender.objects.filter(created_by=user, slug=final_slug).exists()):
        final_slug = f'{slug}{next(i)}'
    instance.slug = final_slug
    instance.save()


def _generate_filename(sender, instance):
    if instance.name:
        return
    filename, ext = os.path.splitext(instance.file.name)
    instance.name = filename
    instance.save()
