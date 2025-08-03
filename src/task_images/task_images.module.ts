import { Module } from '@nestjs/common';
import { TaskImagesService } from './task_images.service';
import { TaskImagesController } from './task_images.controller';

@Module({
  controllers: [TaskImagesController],
  providers: [TaskImagesService],
})
export class TaskImagesModule {}
