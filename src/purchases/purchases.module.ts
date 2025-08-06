import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [PurchasesController],
  providers: [PurchasesService, UserAccessTokenStrategy],
})
export class PurchasesModule {}
