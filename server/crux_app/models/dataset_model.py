from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
import uuid


class Dataset(models.Model):
    name = models.CharField(_('name'),
                            max_length=100,
                            help_text=_('Required. 100 characters or fewer.')
                            )

    description = models.CharField(_('description'),
                                   max_length=500,
                                   help_text=_('500 characters or fewer.')
                                   )

    uuid = models.UUIDField(_('UUID'),
                            default=uuid.uuid4,
                            unique=True,
                            editable=False
                            )

    owner = models.ForeignKey(get_user_model(),
                              on_delete=models.CASCADE,
                              blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(get_user_model(),
                                   on_delete=models.CASCADE,
                                   related_name='updated_by',
                                   blank=True,
                                   null=True
                                   )
    shared_with = models.ForeignKey(get_user_model(),
                                    on_delete=models.CASCADE,
                                    related_name='shared_with',
                                    blank=True,
                                    null=True
                                    )

    REQUIRED_FIELDS = [name, owner]
