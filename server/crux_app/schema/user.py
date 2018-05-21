from django.contrib.auth import get_user_model

import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
import graphql_social_auth


class UserType(DjangoObjectType):
    token = graphene.String(source='get_token')

    class Meta:
        model = get_user_model()


class UserQuery(graphene.ObjectType):
    all_users = graphene.List(UserType)
    current_user = graphene.Field(UserType)

    def resolve_current_user(self, info, **kwargs):
        if info.context.user.is_anonymous:
            return None
        return info.context.user

    def resolve_user_by_email(self, info, email, **kwargs):
        return get_user_model().objects.get(email=email)

    @staff_member_required
    def resolve_all_users(self, info, **kwargs):
        return get_user_model().objects.all()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String()

    def mutate(self, info, email, password=None):
        user = get_user_model().objects.get(email=email)
        if user:
            print('user exists')
            return CreateUser(user=user)

        user = get_user_model()(
            email=email,
        )
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login_user = graphql_jwt.ObtainJSONWebToken.Field()
    social_auth = graphql_social_auth.SocialAuthJWT.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
