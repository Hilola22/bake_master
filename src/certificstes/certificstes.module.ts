import { Module } from '@nestjs/common';
import { CertificstesService } from './certificstes.service';
import { CertificstesController } from './certificstes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CertificstesController],
  providers: [CertificstesService, JwtInstructorAdminStrategy],
})
export class CertificstesModule {}
