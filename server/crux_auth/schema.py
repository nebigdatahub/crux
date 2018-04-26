from django.contrib.auth import get_user_model

import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)


class UserType(DjangoObjectType):
    token = graphene.String(source='get_token')

    class Meta:
        model = get_user_model()


class UserQuery(graphene.ObjectType):
    all_users = graphene.List(UserType)
    current_user = graphene.Field(UserType)

    @login_required
    def resolve_current_user(self, info, **kwargs):
        return info.context.user

    @staff_member_required
    def resolve_all_users(self, info, **kwargs):
        return get_user_model().objects.all()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password):
        user = get_user_model()(
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class UserMutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login_user = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
