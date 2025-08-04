import { Module } from '@nestjs/common';
import { TaskImagesService } from './task_images.service';
import { TaskImagesController } from './task_images.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskImagesController],
  providers: [TaskImagesService],
})
export class TaskImagesModule {}
