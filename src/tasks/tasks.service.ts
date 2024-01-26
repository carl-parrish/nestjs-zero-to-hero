import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { PrismaService } from 'src/prisma.service';
import { Task as TaskModel, Prisma } from '@prisma/client';
import { error } from 'console';

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
    try {
      const find = await this.prisma.task.findUnique({where:id});
      if (!find) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      return find;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new NotFoundException(`Task with ID "${id}" not found`);
          console.log('Task not found');
        }
      }
    }
    throw error;
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
    task_id: Prisma.TaskWhereUniqueInput,
    task_status: TaskStatus,
  ): Promise<TaskModel> {
    return await this.prisma.task.update({
      where: { id: task_id.id },
      data: { status: task_status },
    });
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
