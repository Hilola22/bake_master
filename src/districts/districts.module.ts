import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminAccessTokenStrategy } from '../common/strategies/admin-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [DistrictsController],
  providers: [DistrictsService, AdminAccessTokenStrategy],
})
export class DistrictsModule {}
