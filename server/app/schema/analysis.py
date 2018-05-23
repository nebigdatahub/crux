from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from .file import FileType, FileUploadType, NotebookType
from ..models import Dataset, File, Analysis
from .dataset import DatasetType


class AnalysisType(DjangoObjectType):
    files = graphene.List(NotebookType)

    class Meta:
        model = Analysis

    def resolve_files(self, info, **kwargs):
        return self.files.all()


class AnalysisQuery(graphene.ObjectType):
    all_analyses = graphene.List(AnalysisType)
    user_analyses = graphene.List(AnalysisType)
    analysis_by_slug = graphene.Field(AnalysisType, slug=graphene.String())

    def resolve_all_analyses(self, info, **kwargs):
        return Analysis.objects.all()

    @login_required
    def resolve_user_analyses(self, info, **kwargs):
        return info.context.user.analyses.all()

    def resolve_analysis_by_slug(self, info, slug, **kwargs):
        return Analysis.objects.get(slug=slug)


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
            analysis.files.create(
                name=f'{name}-file',
                file=f,
                uploaded_by=info.context.user
            )

        return CreateAnalysis(analysis=analysis)


class AnalysisMutation(graphene.ObjectType):
    create_analysis = CreateAnalysis.Field()
