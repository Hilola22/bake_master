import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';

@Injectable()
export class PromocodesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPromocodeDto: CreatePromocodeDto) {
    return await this.prisma.promocodes.create({
      data: createPromocodeDto,
    });
  }

  async findAll() {
    return await this.prisma.promocodes.findMany({
      include: {
        payment: true,
        lessons_payment: true,
      },
    });
  }

  async findOne(id: number) {
    const promocode = await this.prisma.promocodes.findUnique({
      where: { id },
      include: {
        payment: true,
        lessons_payment: true,
      },
    });

    if (!promocode) {
      throw new NotFoundException(`Promocode ID ${id} topilmadi`);
    }

    return promocode;
  }

  async update(id: number, updatePromocodeDto: UpdatePromocodeDto) {
    const exists = await this.prisma.promocodes.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Promocode ID ${id} mavjud emas`);
    }

    return await this.prisma.promocodes.update({
      where: { id },
      data: updatePromocodeDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.promocodes.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Promocode ID ${id} mavjud emas`);
    }

    return await this.prisma.promocodes.delete({
      where: { id },
    });
  }
}
