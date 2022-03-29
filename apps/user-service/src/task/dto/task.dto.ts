import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  desc: string;
}

export class UpdateTaskDto extends TaskDto {
  @IsNotEmpty()
  taskId: number;
}
