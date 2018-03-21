from django.contrib.auth import get_user_model
import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
from .models import Dataset, DatasetFile


class DatasetType(DjangoObjectType):
    class Meta:
        model = Dataset


class DatasetFileType(DjangoObjectType):
    class Meta:
        model = DatasetFile


class Query(graphene.ObjectType):
    all_datasets = graphene.List(DatasetType)

    @staff_member_required
    def resolve_all_datasets(self, info, **kwargs):
        return Dataset.objects.all()


class CreateDataset(graphene.Mutation):
    dataset = graphene.Field(DatasetType)

    class Arguments:
        name = graphene.String(required=True)

    @login_required
    def mutate(self, info, name):
        print(info)
        dataset = Dataset(
            name=name,
            owner=info.context.user
        )
        dataset.save()

        return CreateDataset(dataset=dataset)


class CreateDatasetFile(graphene.Mutation):
    # dataset_file = graphene.Field(DatasetFileType)
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True)
        dataset = graphene.Int(required=True)

    @login_required
    def mutate(self, info, name, dataset):
        dataset_file = DatasetFile(
            name=name,
            file=info.context.FILES,
            dataset=Dataset.objects.get(id=dataset),
            uploaded_by=info.context.user
        )
        dataset_file.save()

        return CreateDatasetFile(dataset_file=dataset_file)


class Mutation(graphene.ObjectType):
    create_dataset = CreateDataset.Field()
    create_dataset_file = CreateDatasetFile.Field()
