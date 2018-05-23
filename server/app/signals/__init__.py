from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils.text import slugify
import itertools
from ..models import (Activity,
                      Analysis,
                      Dataset,
                      File,
                      Task)


@receiver(post_save)
def on_create(sender, instance, created, *args, **kwargs):
    if sender not in (Analysis, Dataset, File, Task):
        return
    if created:
        _log_activity(sender, instance)
        _generate_slug(sender, instance)


def _log_activity(sender, instance):
    if sender == File:
        return
    instance.activity.create(kind=Activity.CREATE, by=instance.created_by)


def _generate_slug(sender, instance):
    if sender == Task:
        return
    if instance.slug:
        return
    username = instance.created_by.username
    slug = f'{username}-__-{slugify(instance.name)}'

    i = itertools.count(1)
    while(sender.objects.filter(slug=slug).exists()):
        slug = f'{username}-__-{slugify(instance.name)}{next(i)}'
    instance.slug = slug
    instance.save()
