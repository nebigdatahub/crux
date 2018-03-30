from .common import *

DEBUG = False
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

ALLOWED_HOSTS = [
    'crux-nebigdatahub.herokuapp.com',
    'crux-staging-nebigdatahub.herokuapp.com',
    '127.0.0.1'
]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

MIDDLEWARE += [
    'whitenoise.middleware.WhiteNoiseMiddleware'
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
