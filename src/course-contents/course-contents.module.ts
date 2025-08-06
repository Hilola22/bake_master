import { Module } from '@nestjs/common';
import { CourseContentsService } from './course-contents.service';
import { CourseContentsController } from './course-contents.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorStrategy } from '../common/strategies/instructor-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CourseContentsController],
  providers: [CourseContentsService, JwtInstructorStrategy],
})
export class CourseContentsModule {}
