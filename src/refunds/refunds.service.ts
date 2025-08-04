import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';

@Injectable()
export class RefundsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRefundDto: CreateRefundDto) {
    return await this.prisma.refunds.create({
      data: createRefundDto,
    });
  }

  async findAll() {
    return await this.prisma.refunds.findMany({
      include: {
        payment: true,
      },
    });
  }

  async findOne(id: number) {
    const refund = await this.prisma.refunds.findUnique({
      where: { id },
      include: {
        payment: true,
      },
    });

    if (!refund) {
      throw new NotFoundException(`Refund ID ${id} topilmadi`);
    }

    return refund;
  }

  async update(id: number, updateRefundDto: UpdateRefundDto) {
    const exists = await this.prisma.refunds.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Refund ID ${id} mavjud emas`);
    }

    return await this.prisma.refunds.update({
      where: { id },
      data: updateRefundDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.refunds.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Refund ID ${id} mavjud emas`);
    }

    return await this.prisma.refunds.delete({
      where: { id },
    });
  }
}
