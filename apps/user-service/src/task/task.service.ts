import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { DbService } from 'common/db/db.service';
import {
  CreateTaskEvent,
  DeleteTaskEvent,
  UpdateTaskEvent,
} from 'common/event/task.event';
import { TaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_SERVICE') private readonly client: ClientProxy,
    private db: DbService,
  ) { }

  async createTask(req: TaskDto, user: User) {
    this.client.emit(
      'create_task',
      new CreateTaskEvent(req.title, req.desc, user.id),
    );
    return { message: 'Task creating' };
  }

  async updateTask(req: UpdateTaskDto) {
    this.client.emit(
      'update_task',
      new UpdateTaskEvent(req.taskId, req.title, req.desc),
    );
    return { message: 'Task updating' };
  }

  async deleteTask(taskId: number) {
    this.client.emit('delete_task', new DeleteTaskEvent(taskId));
    return { message: 'Task deleting' };
  }

  async getTasks(userId: number) {
    return this.db.taks.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async getTask(taskId: number, userId: number) {
    const user = await this.db.taks.findUnique({
      where: {
        id: parseInt(taskId.toString(), 10),
      },
    });

    if (user?.ownerId !== userId) {
      throw new NotFoundException('Task not found');
    }

    return user;
  }
}
