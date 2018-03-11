import crux_auth.schema
import crux_datasets.schema
import graphene
from graphene_django.types import DjangoObjectType

QUERIES = [
    crux_auth.schema.Query,
    crux_datasets.schema.Query,
    graphene.ObjectType
]

MUTATIONS = [
    crux_auth.schema.Mutation,
    crux_datasets.schema.Mutation,
    graphene.ObjectType
]


class Query(*QUERIES):
    pass


class Mutation(*MUTATIONS):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
