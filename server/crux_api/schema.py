
from crux_auth import schema
from crux_app.schema import dataset_schema, task_schema, file_schema

import graphene
from graphene_django.types import DjangoObjectType

QUERIES = [
    schema.Query,
    dataset_schema.Query,
    task_schema.Query,
    graphene.ObjectType
]

MUTATIONS = [
    schema.Mutation,
    dataset_schema.Mutation,
    task_schema.Mutation,
    graphene.ObjectType
]


class Query(*QUERIES):
    pass


class Mutation(*MUTATIONS):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         types=[file_schema.FileUploadType])
