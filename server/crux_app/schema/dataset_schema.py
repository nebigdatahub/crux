from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from .file_schema import FileType, FileUploadType
from ..models import Dataset, File


class DatasetType(DjangoObjectType):
    class Meta:
        model = Dataset


class Query(graphene.ObjectType):
    all_datasets = graphene.List(DatasetType)
    user_datasets = graphene.List(DatasetType)

    @staff_member_required
    def resolve_all_datasets(self, info, **kwargs):
        return Dataset.objects.all()

    @login_required
    def resolve_user_datasets(self, info, **kwargs):
        return info.context.user.dataset_set.all()


class CreateDataset(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True)
        files = FileUploadType()

    @login_required
    def mutate(self, info, name, **kwargs):
        up_files = []

        print('creating dataset')
        dataset = Dataset(
            name=name,
            owner=info.context.user,
            **kwargs
        )
        dataset.save()
        print('files: ', info.context.FILES)
        for f in info.context.FILES.getlist('files'):
            file = File(
                file=f,
                **kwargs
            )
            file.save()
            dataset.file_set.add(file)

        return CreateDataset(success=True)


class Mutation(graphene.ObjectType):
    create_dataset = CreateDataset.Field()
