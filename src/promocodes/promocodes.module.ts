import { Module } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { PromocodeController } from './promocodes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtInstructorStrategy } from '../common/strategies/instructor-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [PromocodeController],
  providers: [PromocodesService, JwtInstructorStrategy],
})
export class PromocodesModule {}
