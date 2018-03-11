from .common import *

DEBUG = True

# ======================================
# Static files (CSS, JavaScript, Images)
# ======================================
STATIC_URL = '/assets/'
STATICFILES_DIRS = [
    os.path.abspath(os.path.join(PROJECT_ROOT, 'client', 'public'))
]

with open(os.path.join(BASE_DIR, 'settings', 'secret_key.txt')) as f:
    SECRET_KEY = f.read().strip()

CORS_ORIGIN_ALLOW_ALL = True
