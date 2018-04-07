from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from ..models import Dataset, Task


class TaskType(DjangoObjectType):
    class Meta:
        model = Dataset


class Query(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)
    user_tasks = graphene.List(TaskType)
    task_by_dataset = graphene.Field(TaskType, uuid=graphene.String())

    @staff_member_required
    def resolve_all_tasks(self, info, **kwargs):
        return Task.objects.all()

    @login_required
    def resolve_user_tasks(self, info, **kwargs):
        return info.context.user.task_set.all()

    @login_required
    def resolve_task_by_dataset(self, info, dataset_id, **kwargs):
        dataset = Dataset.get(pk=dataset_id)
        return Task.objects.get(dataset=dataset)


class CreateTask(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        dataset_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, name, dataset_id, **kwargs):
        dataset = Dataset.objects.get(pk=dataset_id)
        task = Task(
            name=name,
            owner=info.context.user,
            **kwargs
        )
        task.save()
        dataset.task_set.add(task)

        return CreateTask(success=True)


class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
