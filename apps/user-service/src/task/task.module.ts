import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'task_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
