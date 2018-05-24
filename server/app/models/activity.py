from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Activity(models.Model):
    by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        null=True
    )
    at = models.DateTimeField(editable=False)

    CREATE = 'CRE'
    UPDATE = 'UPD'
    DELETE = 'DEL'
    ACT_TYPE_CHOICES = (
        (CREATE, 'CREATE'),
        (UPDATE, 'UPDATE'),
        (DELETE, 'DELETE')
    )
    kind = models.CharField(
        max_length=3,
        choices=ACT_TYPE_CHOICES,
        default=UPDATE
    )

    # Fields for GenericRelation
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    class Meta:
        verbose_name_plural = 'Activities'

    def save(self, *args, **kwargs):
        if not self.id:
            self.at = timezone.now()
        super().save(*args, **kwargs)
