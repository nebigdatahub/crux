# Generated by Django 2.0.4 on 2018-04-12 04:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crux_app', '0011_auto_20180412_0443'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='users',
            field=models.ManyToManyField(blank=True, related_name='tasks', to=settings.AUTH_USER_MODEL),
        ),
    ]