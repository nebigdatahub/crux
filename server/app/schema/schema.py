from .dataset import DatasetQuery, DatasetMutation
from .file import FileQuery, FileMutation, FileUploadType
from .task import TaskQuery, TaskMutation
from .analysis import AnalysisQuery, AnalysisMutation
from .user import UserQuery, UserMutation

import graphene
from graphene_django.types import DjangoObjectType

QUERIES = [
    UserQuery,
    FileQuery,
    DatasetQuery,
    TaskQuery,
    AnalysisQuery,
    graphene.ObjectType
]

MUTATIONS = [
    UserMutation,
    FileMutation,
    DatasetMutation,
    TaskMutation,
    AnalysisMutation,
    graphene.ObjectType
]


class Query(*QUERIES):
    pass


class Mutation(*MUTATIONS):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation,
                         types=[FileUploadType])
