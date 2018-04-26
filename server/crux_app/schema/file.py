from django.contrib.auth import get_user_model
import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
from ..models import Dataset, File
from crux.settings.common import BASE_DIR


class FileType(DjangoObjectType):
    content = graphene.String()

    class Meta:
        model = File


class FileQuery(graphene.ObjectType):
    file = graphene.Field(FileType, uuid=graphene.String())

    def resolve_file(self, info, uuid, **kwargs):
        file = File.objects.get(uuid=uuid)
        from nbconvert import HTMLExporter

        with file.file.open() as f:
            body, resources = HTMLExporter(template_file='basic').from_file(f)

        file.content = body
        return file


class FileUploadType(graphene.Scalar):
    def serialize(self):
        pass


class UploadFiles(graphene.Mutation):
    success = graphene.Boolean()
    uploaded_files = graphene.List(FileType)

    class Arguments:
        files = FileUploadType()

    @login_required
    def mutate(self, info, **kwargs):
        files = []
        for f in info.context.FILES.getlist('files'):
            file = File(
                file=f,
                **kwargs
            )
            file.save()
            files.append(file)

        return UploadFiles(success=True, uploaded_files=files)


class FileMutation(graphene.ObjectType):
    upload_files = UploadFiles.Field()
