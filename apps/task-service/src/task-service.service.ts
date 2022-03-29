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
    await this.db.taks.update({
      where: {
        id: Number(data.id),
      },
      data: {
        title: data.title,
        desc: data.desc,
      },
    });
  }

  async deleteTask(data: DeleteTaskEvent) {
    await this.db.taks.delete({
      where: {
        id: Number(data.id),
      },
    });
  }
}
