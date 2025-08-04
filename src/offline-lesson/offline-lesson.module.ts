import { Module } from '@nestjs/common';
import { OfflineLessonService } from './offline-lesson.service';
import { OfflineLessonController } from './offline-lesson.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OfflineLessonController],
  providers: [OfflineLessonService],
})
export class OfflineLessonModule {}
