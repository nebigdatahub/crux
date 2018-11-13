#!/usr/bin/env python
import os
import sys

"""
Manage.py file to set up django execution on CLI
"""

if __name__ == "__main__":
    DJANGO_SETTINGS_MODULE = os.environ.get(
        'DJANGO_SETTINGS_MODULE') or 'settings.development'
    os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                          DJANGO_SETTINGS_MODULE)
    SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
