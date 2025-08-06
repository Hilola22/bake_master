import { Module } from '@nestjs/common';
import { OfflineLessonService } from './offline-lesson.service';
import { OfflineLessonController } from './offline-lesson.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorStrategy } from '../common/strategies/instructor-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [OfflineLessonController],
  providers: [OfflineLessonService, JwtInstructorStrategy],
})
export class OfflineLessonModule {}
