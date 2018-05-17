# Generated by Django 2.0.4 on 2018-04-26 07:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('crux_app', '0015_analysis'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analysis',
            name='dataset',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='analysis_list', to='crux_app.Dataset'),
        ),
        migrations.AlterField(
            model_name='analysis',
            name='owner',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='analysis_list', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='analysis',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='analysis_list', to='crux_app.Task'),
        ),
    ]