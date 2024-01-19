import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { PrismaService } from 'src/prisma.service';
import { Task as TaskModel, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  //Create Task
  public async createTask(data: Prisma.TaskCreateInput): Promise<TaskModel> {
    return this.prisma.task.create({
      data,
    });
  }

  //Retrieve Task
  public async getTaskById(
    id: Prisma.TaskWhereUniqueInput,
  ): Promise<TaskModel | null> {
    return this.prisma.task.findUnique({
      where: id,
    });
  }

  public async getAllTasks(): Promise<TaskModel[]> {
    return this.prisma.task.findMany();
  }

  public async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<TaskModel> {
    const { where, data } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }

  public async updateTaskStatusById(
    id: Prisma.TaskWhereUniqueInput,
    status: TaskStatus,
  ): Promise<TaskModel> {
    const task = await this.getTaskById(id);
    task.status = status;
    return task;
  }

  // Delete Task
  public async deleteTaskById(
    where: Prisma.TaskWhereUniqueInput,
  ): Promise<TaskModel> {
    return this.prisma.task.delete({
      where,
    });
  }

  /* public getTasksWithFilter(filterDto: GetTaskFilterDto): TaskModel[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  } */
}
