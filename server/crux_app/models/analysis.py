from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
import uuid

from .dataset import Dataset
from .task import Task


class Analysis(models.Model):
    name = models.CharField(_('name'),
                            max_length=100,
                            help_text=_('Required. 100 characters or fewer.')
                            )

    description = models.CharField(_('description'),
                                   max_length=500,
                                   help_text=_('500 characters or fewer.'),
                                   blank=True
                                   )

    uuid = models.UUIDField(_('UUID'),
                            default=uuid.uuid4,
                            unique=True,
                            editable=False
                            )

    dataset = models.ForeignKey(Dataset,
                                on_delete=models.CASCADE,
                                related_name="analysis_list",
                                blank=True)

    task = models.ForeignKey(Task,
                             on_delete=models.CASCADE,
                             related_name="analysis_list",
                             blank=True,
                             null=True)

    owner = models.ForeignKey(get_user_model(),
                              on_delete=models.CASCADE,
                              related_name="analysis_list",
                              blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = [name, owner]

    class Meta:
        permissions = (
            ('owner', 'Superuser access'),
            ('editor', 'Can view, edit, comment, share but not delete'),
            ('commenter', 'Can view, comment but not edit or delete'),
            ('viewer', 'Can only view dataset')
        )
