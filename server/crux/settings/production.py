from .common import *

DEBUG = False
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

ALLOWED_HOSTS = [
    'crux-nebigdatahub.herokuapp.com',
    'crux-staging-nebigdatahub.herokuapp.com'
]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

MIDDLEWARE += [
    'whitenoise.middleware.WhiteNoiseMiddleware'
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'assets')
STATIC_URL = '/assets/'
STATICFILES_DIRS = [
    os.path.join(PROJECT_ROOT, 'client', 'public')
]
