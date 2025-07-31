import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionsController } from './region.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RegionsController],
  providers: [RegionService],
})
export class RegionModule {}
