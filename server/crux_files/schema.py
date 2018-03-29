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
        # return File.objects.filter(owner=info.context.user)
        print(info.context.user)
        return info.context.user.dataset_set

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


class UploadFiles(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        dataset_id = graphene.Int(required=True)
        files = Upload()

    @login_required
    def mutate(self, info, dataset_id):
        for f in info.context.FILES.getlist('files'):
            file = File(
                file=f,
                dataset=Dataset.objects.get(id=dataset_id),
                owner=info.context.user
            )
            file.save()

        return UploadFiles(success=True)


class Mutation(graphene.ObjectType):
    upload_files = UploadFiles.Field()
