import crux_auth.schema
import crux_app.schema

import graphene
from graphene_django.types import DjangoObjectType

QUERIES = [
    crux_auth.schema.Query,
    crux_app.schema.Query,
    graphene.ObjectType
]

MUTATIONS = [
    crux_auth.schema.Mutation,
    crux_app.schema.Mutation,
    graphene.ObjectType
]


class Query(*QUERIES):
    pass


class Mutation(*MUTATIONS):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         types=[crux_app.schema.FileUploadType])
