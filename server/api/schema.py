import graphene

from graphene_django.types import DjangoObjectType
from crux_auth.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()


schema = graphene.Schema(query=Query)
