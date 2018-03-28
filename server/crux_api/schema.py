import crux_auth.schema
import crux_datasets.schema
import crux_files.schema
import graphene
from graphene_django.types import DjangoObjectType

QUERIES = [
    crux_auth.schema.Query,
    crux_datasets.schema.Query,
    crux_files.schema.Query,
    graphene.ObjectType
]

MUTATIONS = [
    crux_auth.schema.Mutation,
    crux_datasets.schema.Mutation,
    crux_files.schema.Mutation,
    graphene.ObjectType
]


class FileUpload(graphene.Scalar):
    def serializer(self):
        pass


class Query(*QUERIES):
    pass


class Mutation(*MUTATIONS):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         types=[crux_files.schema.Upload])
