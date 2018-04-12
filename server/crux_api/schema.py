
from crux_auth.schema import UserQuery, UserMutation
from crux_app.schema import DatasetQuery, DatasetMutation
from crux_app.schema import FileQuery, FileMutation, FileUploadType
from crux_app.schema import TaskQuery, TaskMutation

import graphene
from graphene_django.types import DjangoObjectType

QUERIES = [
    UserQuery,
    FileQuery,
    DatasetQuery,
    TaskQuery,
    graphene.ObjectType
]

MUTATIONS = [
    UserMutation,
    FileMutation,
    DatasetMutation,
    TaskMutation,
    graphene.ObjectType
]


class Query(*QUERIES):
    pass


class Mutation(*MUTATIONS):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         types=[FileUploadType])
