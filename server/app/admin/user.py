from django.contrib.admin import register, ModelAdmin
from django.utils.translation import gettext as _

from ..models import User


@register(User)
class UserAdmin(ModelAdmin):
    pass
