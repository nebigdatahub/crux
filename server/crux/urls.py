from django.contrib import admin
from django.urls import path, re_path, include
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

from graphene_django.views import GraphQLView
from . import views

urlpatterns = [
    re_path(r'^admin$', RedirectView.as_view(url='/admin/', permanent=False)),
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    re_path(r'', views.home, name='home'),
]
