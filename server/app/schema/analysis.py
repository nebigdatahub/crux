import os

import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from ..models import Analysis, Dataset, File, User
from .dataset import DatasetType
from .file import FileType, FileUploadType, NotebookType


class AnalysisType(DjangoObjectType):
    files = graphene.List(NotebookType)

    class Meta:
        model = Analysis

    def resolve_files(self, info, **kwargs):
        return self.files.all()


class AnalysisQuery(graphene.ObjectType):
    all_analyses = graphene.List(AnalysisType)
    users_analyses = graphene.List(AnalysisType, username=graphene.String())
    analysis = graphene.Field(
        AnalysisType, username=graphene.String(), slug=graphene.String())

    def resolve_all_analyses(self, info, **kwargs):
        return Analysis.objects.all()

    @login_required
    def resolve_users_analyses(self, info, username=None, **kwargs):
        if not username:
            return info.context.user.analyses.all()
        user = User.objects.get(username=username)
        return user.analyses.all()

    def resolve_analysis(self, info, username, slug, **kwargs):
        user = User.objects.get(username=username)
        return Analysis.objects.get(created_by=user, slug=slug)


class CreateAnalysis(graphene.Mutation):
    analysis = graphene.Field(AnalysisType)

    class Arguments:
        name = graphene.String(required=True)
        readme = graphene.String()
        dataset_id = graphene.Int(required=True)
        files = FileUploadType()

    @login_required
    def mutate(self, info, name, dataset_id, readme=None, **kwargs):
        dataset = Dataset.objects.get(pk=dataset_id)
        analysis = Analysis(name=name,
                            created_by=info.context.user,
                            dataset=dataset,
                            **kwargs)
        analysis.save()
        for f in info.context.FILES.getlist('files'):
            name, ext = os.path.splitext(f'{f.name}')
            analysis.files.create(name=f'{name}-file',
                                  file=f,
                                  created_by=info.context.user)

        return CreateAnalysis(analysis=analysis)


class AnalysisMutation(graphene.ObjectType):
    create_analysis = CreateAnalysis.Field()
