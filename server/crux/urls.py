from django.contrib import admin
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import handler404, handler500

from graphene_django.views import GraphQLView
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    re_path(r'', views.home, name='home'),
]
