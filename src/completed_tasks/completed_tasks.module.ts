import { Module } from '@nestjs/common';
import { CompletedTasksService } from './completed_tasks.service';
import { CompletedTasksController } from './completed_tasks.controller';

@Module({
  controllers: [CompletedTasksController],
  providers: [CompletedTasksService],
})
export class CompletedTasksModule {}
