import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    return this.prisma.equipments.create({
      data: createEquipmentDto,
    });
  }

  findAll() {
    return this.prisma.equipments.findMany({
      include: {
        course_contents: true,
      },
    });
  }

  async findOne(id: number) {
    const equipment = await this.prisma.equipments.findUnique({
      where: { id },
      include: {
        course_contents: true,
      },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    return equipment;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.prisma.equipments.findUnique({
      where: { id },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    return this.prisma.equipments.update({
      where: { id },
      data: updateEquipmentDto,
    });
  }

  async remove(id: number) {
    const equipment = await this.prisma.equipments.findUnique({
      where: { id },
    });
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }
    await this.prisma.equipments.delete({ where: { id } });
    return 'Equipment deleted!';
  }
}
