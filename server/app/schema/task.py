from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType
from graphql_extensions.auth.decorators import (login_required,
                                                staff_member_required)

from ..models import Dataset, Task


class TaskType(DjangoObjectType):
    class Meta:
        model = Task


class TaskQuery(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)
    user_tasks = graphene.List(TaskType)
    task_by_dataset = graphene.Field(TaskType, uuid=graphene.String())

    @staff_member_required
    def resolve_all_tasks(self, info, **kwargs):
        return Task.objects.all()

    @login_required
    def resolve_user_tasks(self, info, **kwargs):
        return info.context.user.my_tasks.all()

    @login_required
    def resolve_task_by_dataset(self, info, dataset_id, **kwargs):
        dataset = Dataset.get(pk=dataset_id)
        return Task.objects.get(dataset=dataset)


class CreateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        dataset_id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, name, dataset_id, **kwargs):
        dataset = Dataset.objects.get(pk=dataset_id)
        task = Task(
            name=name,
            created_by=info.context.user,
            dataset=dataset,
            **kwargs
        )
        task.save()

        return CreateTask(task=task)


class TaskMutation(graphene.ObjectType):
    create_task = CreateTask.Field()
