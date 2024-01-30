import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task as TaskModel } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<TaskModel[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('filtered-tasks/:searchString')
  async getFilteredTasks(
    @Param('searchString'.toLowerCase()) searchString: string,
  ): Promise<TaskModel[]> {
    return this.tasksService.getFilteredTasks({
      where: {
        OR: [
          {
            title: { contains: searchString.toLowerCase() },
          },
          {
            description: { contains: searchString.toLowerCase() },
          },
        ],
      },
    });
  }

  @Get('status/:status')
  async getTasksByStatus(
    @Param('status') taskStatus: TaskStatus,
  ): Promise<TaskModel[]> {
    return this.tasksService.getFilteredTasks({
      where: {
        status: TaskStatus[taskStatus],
      },
    });
  }

  getTasks(): Promise<TaskModel[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.getTaskById({ id: id });
  }

  @Post()
  createTask(
    @Body()
    taskData: CreateTaskDto,
  ): Promise<TaskModel> {
    return this.tasksService.createTask(taskData);
  }

  @Patch('/:id/status')
  UpdateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<TaskModel> {
    return this.tasksService.updateTaskStatusById(
      { id: id },
      TaskStatus[status],
    );
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.deleteTaskById({ id: id });
  }
}
