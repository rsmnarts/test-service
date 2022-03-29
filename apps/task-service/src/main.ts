import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TaskServiceModule } from './task-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TaskServiceModule);
  const cfg = app.get<ConfigService>(ConfigService);

  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [cfg.get('RABBITMQ_URL')],
      queue: 'task_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
