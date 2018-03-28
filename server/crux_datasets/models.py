from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


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

    REQUIRED_FIELDS = [name, owner]
