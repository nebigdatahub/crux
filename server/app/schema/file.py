import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from settings.common import BASE_DIR

from ..models import Dataset, File


class FileType(DjangoObjectType):
    body = graphene.String()
    resources = graphene.String()

    class Meta:
        model = File


class FileQuery(graphene.ObjectType):
    notebook = graphene.Field(FileType, slug=graphene.String())

    def resolve_notebook(self, info, slug, **kwargs):
        file = File.objects.get(slug=slug)
        import nbformat
        from nbconvert import HTMLExporter

        with file.file.open() as f:
            notebook = nbformat.reads(f.read(), as_version=4)
            html_exporter = HTMLExporter()
            body, resources = html_exporter.from_notebook_node(notebook)

        file.body = body
        file.resources = ' '.join(resources['inlining']['css'])
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
