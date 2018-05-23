import graphene
import graphql_jwt
import nbformat
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)
from nbconvert import HTMLExporter

from settings.common import BASE_DIR

from ..models import Dataset, File


class FileType(DjangoObjectType):
    class Meta:
        model = File


class NotebookType(DjangoObjectType):
    content = graphene.String()

    class Meta:
        model = File

    def resolve_content(self, info, **kwargs):
        with self.file.open() as f:
            notebook = nbformat.reads(f.read(), as_version=4)
            html_exporter = HTMLExporter()
            body, resources = html_exporter.from_notebook_node(notebook)
        return body


class FileQuery(graphene.ObjectType):
    pass


class FileUploadType(graphene.Scalar):
    def serialize(self):
        pass


class UploadFiles(graphene.Mutation):
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

        return UploadFiles(uploaded_files=files)


class FileMutation(graphene.ObjectType):
    upload_files = UploadFiles.Field()
