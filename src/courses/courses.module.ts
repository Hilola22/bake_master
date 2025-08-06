import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorStrategy } from '../common/strategies/instructor-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CoursesController],
  providers: [CoursesService, JwtInstructorStrategy],
})
export class CoursesModule {}
