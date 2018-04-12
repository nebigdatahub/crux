from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from .dataset import Dataset
from .task import Task


class File(models.Model):
    name = models.CharField(
        _('name'),
        max_length=100,
        help_text=_('Required. 100 characters or fewer.')
    )

    file = models.FileField()
    dataset = models.ForeignKey(Dataset,
                                on_delete=models.CASCADE,
                                related_name='files',
                                blank=True,
                                null=True,)
    task = models.ForeignKey(Task,
                             on_delete=models.CASCADE,
                             related_name='files',
                             blank=True,
                             null=True)

    DATASET = 'DS'
    TASK = 'TA'
    FILE_TYPE_CHOICES = (
        (DATASET, 'Dataset'),
        (TASK, 'Task')
    )
    file_type = models.CharField(_('file_type'),
                                 max_length=2,
                                 choices=FILE_TYPE_CHOICES,
                                 blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = [file]

    def clean_fields(self, *args, **kwargs):
        if not self.dataset and not self.task:
            raise ValidationError(
                _('File must be associated with a task or a dataset'))
        else:
            self.file_type = self.DATASET if self.dataset else self.TASK
