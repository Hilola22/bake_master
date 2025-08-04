import { Module } from '@nestjs/common';
import { CourseContentsService } from './course-contents.service';
import { CourseContentsController } from './course-contents.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseContentsController],
  providers: [CourseContentsService],
})
export class CourseContentsModule {}
