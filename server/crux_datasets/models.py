from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from crux_files.models import File


class Dataset(models.Model):
    name = models.CharField(_('name'),
                            max_length=100,
                            help_text=_('Required. 100 characters or fewer.')
                            )

    description = models.CharField(_('description'),
                                   max_length=500,
                                   help_text=_('500 characters or fewer.')
                                   )

    owner = models.ForeignKey(get_user_model(),
                              on_delete=models.CASCADE)

    files = models.ForeignKey(File,
                              on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.ManyToManyField(get_user_model(),
                                        related_name='updated_by')
    shared_with = models.ManyToManyField(get_user_model(),
                                         related_name='shared_with')

    REQUIRED_FIELDS = [name, owner]
