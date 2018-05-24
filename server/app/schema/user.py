
import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
import graphql_social_auth

from ..models import User


class UserType(DjangoObjectType):
    token = graphene.String(source='get_token')

    class Meta:
        model = User


class UserQuery(graphene.ObjectType):
    all_users = graphene.List(UserType)
    current_user = graphene.Field(UserType)
    user_profile = graphene.Field(UserType, username=graphene.String())

    def resolve_current_user(self, info, **kwargs):
        if info.context.user.is_anonymous:
            return None
        return info.context.user

    def resolve_user_profile(self, info, username, **kwargs):
        return User.objects.get(username=username)

    @staff_member_required
    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String()

    def mutate(self, info, email, password=None):
        user, created = User.objects.get_or_create(email=email)
        if created:
            user.set_password(password)
            user.save()
        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login_user = graphql_jwt.ObtainJSONWebToken.Field()
    social_auth = graphql_social_auth.SocialAuthJWT.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
