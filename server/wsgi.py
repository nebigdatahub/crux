import os

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

settings = "settings.production" if os.environ.get(
    'NODE_ENV') == "production" else "settings.staging"

os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings)

application = DjangoWhiteNoise(get_wsgi_application())
