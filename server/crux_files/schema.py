from django.contrib.auth import get_user_model
import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
from .models import File
from crux_datasets.models import Dataset


class FileType(DjangoObjectType):
    class Meta:
        model = File


class Query(graphene.ObjectType):
    all_files = graphene.List(FileType)
    user_files = graphene.List(FileType)
    dataset_files = graphene.List(FileType)
    file = graphene.Field(FileType)

    @staff_member_required
    def resolve_all_files(self, info, **kwargs):
        return File.objects.all()

    @login_required
    def resolve_user_files(self, info, **kwargs):
        return File.objects.filter(owner=info.context.user)

    @login_required
    def resolve_dataset_files(self, info, dataset_id, **kwargs):
        dataset = Dataset.objects.get(pk=dataset_id)
        if dataset is not None:
            return File.objects.filter(dataset=dataset)
        else:
            # Raise some error
            return None

    def resolve_file(self, info, file_id, **kwargs):
        file = File.objects.get(pk=file_id)
        # TODO: Check if user has permissions to view the file
        if not file:
            return file
        else:
            # Raise some error
            return None


class Upload(graphene.Scalar):
    def serialize(self):
        pass


class CreateFile(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        # name = graphene.String(required=True)
        dataset_id = graphene.Int(required=True)
        file = Upload()

    @login_required
    def mutate(self, info, dataset_id):
        print(info.context.FILES)
        file = File(
            file=info.context.FILES['file'],
            dataset=Dataset.objects.get(id=dataset_id),
            owner=info.context.user
        )
        file.save()

        return CreateFile(success=True)


class Mutation(graphene.ObjectType):
    create_file = CreateFile.Field()
