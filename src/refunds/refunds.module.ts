import { Module } from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { RefundsController } from './refunds.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [RefundsController],
  providers: [RefundsService, JwtInstructorAdminStrategy],
})
export class RefundsModule {}
