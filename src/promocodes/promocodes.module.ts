import { Module } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { PromocodeController } from './promocodes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PromocodeController],
  providers: [PromocodesService],
})
export class PromocodesModule {}
