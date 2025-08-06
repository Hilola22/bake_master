import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionsController } from './region.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminAccessTokenStrategy } from '../common/strategies/admin-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [RegionsController],
  providers: [RegionService, AdminAccessTokenStrategy],
})
export class RegionModule {}
