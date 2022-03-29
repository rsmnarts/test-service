import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from 'common/jwt';
import { TaskDto } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    @Inject('TASK_SERVICE') private readonly client: ClientProxy,
  ) { }

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  createTask(@Request() req) {
    return this.taskService.createTask(req.body, req.user);
  }

  @Patch('/:taskId')
  updateTask(@Param('taskId') taskId: number, @Body() req: TaskDto) {
    return this.taskService.updateTask({ taskId: taskId, ...req });
  }

  @Get()
  getTasks(@Request() req) {
    return this.taskService.getTasks(req.user.id);
  }

  @Get('/:taskId')
  getTask(@Param('taskId') taskId: number, @Request() req) {
    return this.taskService.getTask(taskId, req.user.id);
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId') taskId: number) {
    return this.taskService.deleteTask(taskId);
  }
}
