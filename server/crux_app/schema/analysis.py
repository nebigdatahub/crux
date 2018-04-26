from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from .file import FileType, FileUploadType
from ..models import Dataset, File, Analysis


class AnalysisType(DjangoObjectType):
    class Meta:
        model = Analysis


class AnalysisQuery(graphene.ObjectType):
    all_analyses = graphene.List(AnalysisType)
    user_analyses = graphene.List(AnalysisType)
    analysis_by_uuid = graphene.Field(AnalysisType, uuid=graphene.String())

    def resolve_all_analyses(self, info, **kwargs):
        return Analysis.objects.all()

    @login_required
    def resolve_user_analyses(self, info, **kwargs):
        return info.context.user.analysis_list.all()

    def resolve_analysis_by_uuid(self, info, uuid, **kwargs):
        return Analysis.objects.get(uuid=uuid)


class CreateAnalysis(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        files = FileUploadType()

    @login_required
    def mutate(self, info, name, description, **kwargs):
        up_files = []

        analysis = Analysis(name=name,
                            owner=info.context.user,
                            **kwargs)
        analysis.save()
        for f in info.context.FILES.getlist('files'):
            file = File(file=f,
                        file_type='DS',
                        ** kwargs)
            file.save()
            Analysis.files.add(file)

        return CreateAnalysis(Analysis)


class AnalysisMutation(graphene.ObjectType):
    create_analyses = CreateAnalysis.Field()
