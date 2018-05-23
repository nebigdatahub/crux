from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from .file import FileType, FileUploadType
from ..models import Dataset, File, User


class DatasetType(DjangoObjectType):
    class Meta:
        model = Dataset


class DatasetQuery(graphene.ObjectType):
    all_datasets = graphene.List(DatasetType)
    users_datasets = graphene.List(DatasetType, username=graphene.String())
    dataset_by_slug = graphene.Field(DatasetType, slug=graphene.String())

    def resolve_all_datasets(self, info, **kwargs):
        return Dataset.objects.all()

    def resolve_users_datasets(self, info, username=None, **kwargs):
        if info.context.user.is_anonymous:
            return None
        if not username:
            return info.context.user.datasets.all()
        return User.objects.get(username=username).datasets.all()

    def resolve_dataset_by_slug(self, info, slug, **kwargs):
        return Dataset.objects.get(slug=slug)


class CreateDataset(graphene.Mutation):
    dataset = graphene.Field(DatasetType)

    class Arguments:
        name = graphene.String(required=True)
        readme = graphene.String()
        files = FileUploadType()

    @login_required
    def mutate(self, info, name, readme=None, **kwargs):
        dataset = Dataset(
            name=name,
            created_by=info.context.user,
            **kwargs
        )
        dataset.save()
        for f in info.context.FILES.getlist('files'):
            file = File(
                file=f,
                file_type='DS',
                **kwargs
            )
            file.save()
            dataset.files.add(file)

        return CreateDataset(dataset=dataset)


class DatasetMutation(graphene.ObjectType):
    create_dataset = CreateDataset.Field()
