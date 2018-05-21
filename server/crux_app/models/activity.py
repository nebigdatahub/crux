from django.db import models
from django.utils import timezone


class BaseActivity(models.Model):
    by = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
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
    act_type = models.CharField(
        max_length=2,
        choices=ACT_TYPE_CHOICES,
        default=UPDATE
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.id:
            self.at = timezone.now()
        super().save(*args, **kwargs)


class AnalysisActivity(BaseActivity):
    on = models.ForeignKey(
        'Analysis',
        on_delete=models.CASCADE,
    )


class DatasetActivity(BaseActivity):
    on = models.ForeignKey(
        'Dataset',
        on_delete=models.CASCADE,
    )


class TaskActivity(BaseActivity):
    on = models.ForeignKey(
        'Task',
        on_delete=models.CASCADE
    )
