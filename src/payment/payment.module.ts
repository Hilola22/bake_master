import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [PaymentController],
  providers: [PaymentService, JwtInstructorAdminStrategy, UserAccessTokenStrategy],
})
export class PaymentModule {}
