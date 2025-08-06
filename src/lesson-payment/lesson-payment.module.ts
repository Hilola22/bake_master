import { Module } from '@nestjs/common';
import { LessonPaymentService } from './lesson-payment.service';
import { LessonPaymentController } from './lesson-payment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [LessonPaymentController],
  providers: [LessonPaymentService, JwtInstructorAdminStrategy, UserAccessTokenStrategy],
})
export class LessonPaymentModule {}
