import { Injectable } from '@nestjs/common';
import { DbService } from 'common/db/db.service';
import {
  CreateTaskEvent,
  DeleteTaskEvent,
  UpdateTaskEvent,
} from 'common/event';

@Injectable()
export class TaskServiceService {
  constructor(private db: DbService) { }

  async createTask(data: CreateTaskEvent) {
    await this.db.taks.create({
      data: {
        title: data.title,
        desc: data.desc,
        ownerId: data.ownerId,
      },
    });
  }

  async updateTask(data: UpdateTaskEvent) {
    await this.db.taks.updateMany({
      where: {
        id: Number(data.id),
        deletedAt: null,
      },
      data: {
        title: data.title,
        desc: data.desc,
      },
    });
  }

  async deleteTask(data: DeleteTaskEvent) {
    await this.db.taks.updateMany({
      where: {
        id: Number(data.id),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
