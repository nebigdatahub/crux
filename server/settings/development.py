from .common import *

DEBUG = True

with open(os.path.join(BASE_DIR, 'settings', 'secret_key.txt')) as f:
    SECRET_KEY = f.read().strip()
SECRET_KEY = "secretkeyfortravis"
CORS_ORIGIN_ALLOW_ALL = True

if os.getenv('BUILD_ON_TRAVIS', None):
    SECRET_KEY = "SecretKeyForUseOnTravis"
    DEBUG = False
    TEMPLATE_DEBUG = True

ALLOWED_HOSTS = [
    'crux',
    'localhost'
]
