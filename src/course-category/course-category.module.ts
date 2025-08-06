import { Module } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategoryController } from './course-category.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService, JwtInstructorAdminStrategy],
})
export class CourseCategoryModule {}
