import os
import re
import itertools
from calendar import timegm
from datetime import datetime, timedelta

import jwt
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(
        unique=True)
    organization = models.CharField(max_length=100)
    username = models.CharField(
        max_length=150,
        unique=True
    )

    bio = models.CharField(_('bio'),
                           help_text=_(
        'About yourself. 1000 characters or less.'),
        max_length=1000)

    objects = UserManager()

    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self._get_username(self.email)
        super().save(*args, **kwargs)

    def _get_username(self, email):
        username = uname = re.sub('[^a-zA-Z0-9-_ \n]', '', email.split('@')[0])
        i = itertools.count(1)
        while(User.objects.filter(username=username).exists()):
            username = f'{uname}{next(i)}'
        return username
