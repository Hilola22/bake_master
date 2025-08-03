import { Module } from '@nestjs/common';
import { CertificstesService } from './certificstes.service';
import { CertificstesController } from './certificstes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CertificstesController],
  providers: [CertificstesService],
})
export class CertificstesModule {}
