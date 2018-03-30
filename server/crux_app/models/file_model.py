from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


class File(models.Model):
    name = models.CharField(
        _('name'),
        max_length=100,
        help_text=_('Required. 100 characters or fewer.')
    )

    file = models.FileField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = [file]
