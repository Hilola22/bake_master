import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, JwtInstructorAdminStrategy],
})
export class EquipmentsModule {}
