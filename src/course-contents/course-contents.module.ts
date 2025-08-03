import { Module } from '@nestjs/common';
import { CourseContentsService } from './course-contents.service';
import { CourseContentsController } from './course-contents.controller';

@Module({
  controllers: [CourseContentsController],
  providers: [CourseContentsService],
})
export class CourseContentsModule {}
