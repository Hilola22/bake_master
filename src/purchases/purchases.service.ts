import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    return await this.prisma.purchases.create({
      data: createPurchaseDto,
    });
  }

  async findAll() {
    return await this.prisma.purchases.findMany({
      include: {
        courses: true,
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const purchase = await this.prisma.purchases.findUnique({
      where: { id },
      include: {
        courses: true,
        user: true,
      },
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase ID ${id} topilmadi`);
    }

    return purchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const exists = await this.prisma.purchases.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Purchase ID ${id} mavjud emas`);
    }

    return await this.prisma.purchases.update({
      where: { id },
      data: updatePurchaseDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.purchases.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Purchase ID ${id} mavjud emas`);
    }

    return await this.prisma.purchases.delete({
      where: { id },
    });
  }
}
