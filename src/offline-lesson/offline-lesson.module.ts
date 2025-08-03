import { Module } from '@nestjs/common';
import { OfflineLessonService } from './offline-lesson.service';
import { OfflineLessonController } from './offline-lesson.controller';

@Module({
  controllers: [OfflineLessonController],
  providers: [OfflineLessonService],
})
export class OfflineLessonModule {}
