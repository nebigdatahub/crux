from .common import *
import dj_database_url

DEBUG = True
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

ALLOWED_HOSTS = [
    'crux-nebigdatahub.herokuapp.com',
    'crux-staging-nebigdatahub.herokuapp.com',
    '127.0.0.1',
    'localhost'
]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

MIDDLEWARE += [
    'whitenoise.middleware.WhiteNoiseMiddleware'
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES['default'] = dj_database_url.config()
