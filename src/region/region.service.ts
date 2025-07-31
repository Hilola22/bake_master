import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    return this.prisma.region.create({
      data: createRegionDto,
    });
  }

  findAll() {
    return this.prisma.region.findMany({
      include: { districts: true },
    });
  }

  async findOne(id: number) {
    const region = await this.prisma.region.findUnique({
      where: { id },
      include: { districts: true },
    });
    if (!region) {
      throw new NotFoundException(`Region ID:${id} not found`);
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.prisma.region.findUnique({ where: { id } });
    if (!region) {
      throw new NotFoundException(`Region ID:${id} not found`);
    }

    return this.prisma.region.update({
      where: { id },
      data: updateRegionDto,
    });
  }

  async remove(id: number) {
    const region = await this.prisma.region.findUnique({ where: { id } });
    if (!region) {
      throw new NotFoundException(`Region ID:${id} not found`);
    }

    await this.prisma.region.delete({ where: { id } });
    return { message: 'Region deleted successfully' };
  }
}
