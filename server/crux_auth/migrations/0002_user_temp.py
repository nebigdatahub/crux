# Generated by Django 2.0.4 on 2018-05-13 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crux_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='temp',
            field=models.BooleanField(default=False, verbose_name='temp'),
            preserve_default=False,
        ),
    ]
