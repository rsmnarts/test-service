import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  CreateTaskEvent,
  DeleteTaskEvent,
  UpdateTaskEvent,
} from 'common/event';
import { TaskServiceService } from './task-service.service';
@Controller()
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) { }

  @EventPattern('create_task')
  createTask(data: CreateTaskEvent) {
    return this.taskServiceService.createTask(data);
  }

  @EventPattern('update_task')
  updateTask(data: UpdateTaskEvent) {
    return this.taskServiceService.updateTask(data);
  }

  @EventPattern('delete_task')
  deleteTask(data: DeleteTaskEvent) {
    return this.taskServiceService.deleteTask(data);
  }
}
