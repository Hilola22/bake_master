import { Module } from '@nestjs/common';
import { CompletedTasksService } from './completed_tasks.service';
import { CompletedTasksController } from './completed_tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompletedTasksController],
  providers: [CompletedTasksService],
})
export class CompletedTasksModule {}
