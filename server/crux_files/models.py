from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from crux_datasets.models import Dataset


class File(models.Model):
    name = models.CharField(
        _('name'),
        max_length=100,
        help_text=_('Required. 100 characters or fewer.')
    )

    file = models.FileField()

    dataset = models.ForeignKey(Dataset,
                                on_delete=models.CASCADE)

    owner = models.ForeignKey(get_user_model(),
                              on_delete=models.CASCADE)

    REQUIRED_FIELDS = [file, dataset]
