import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
from ..models import Dataset, Analysis, Tag
from .dataset import DatasetType
from .analysis import AnalysisType


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class TagQuery(graphene.ObjectType):
    all_tags = graphene.List(TagType)
    tag_datasets = graphene.List(DatasetType)
    tag_analyses = graphene.List(AnalysisType)

    def resolve_all_tags(self, info, **kwargs):
        return Tag.objects.all()

    def resolve_tag_datasets(self, info, text, **kwargs):
        tags = Tag.objects.filter(text=text, content_type=Dataset)

    def resolve_tag_analyses(self, info, text, **kwargs):
        return Tag.objects.filter(text=text, content_type=Analysis)


class TagMutation(graphene.ObjectType):
    pass
