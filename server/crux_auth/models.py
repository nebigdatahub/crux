from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

import jwt
import os
from datetime import datetime, timedelta
from calendar import timegm
from django.conf import settings


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

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
    email = models.EmailField(_('email_address'),
                              unique=True)
    name = models.CharField(_('Full name'),
                            max_length=100)
    organization = models.CharField(_('username'),
                                    max_length=100,
                                    default=str(email).split('@')[0])
    username = models.CharField(_('username'),
                                max_length=150,
                                help_text=_('Required. 150 characters or fewer.\
                                            Letters, digits and ./-/_ only.'),
                                )

    bio = models.CharField(_('bio'),
                           help_text=_(
                               'About yourself. 1000 characters or less.'),
                           max_length=1000)

    objects = UserManager()

    REQUIRED_FIELDS = []
