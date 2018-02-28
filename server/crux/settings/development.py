from .common import *

DEBUG = True

# ======================================
# Static files (CSS, JavaScript, Images)
# ======================================
STATIC_URL = '/assets/'
STATICFILES_DIRS = [
    os.path.abspath(os.path.join(PROJECT_ROOT, 'client', 'public'))
]
