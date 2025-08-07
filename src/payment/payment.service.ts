import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.prisma.payment.create({
      data: createPaymentDto,
    });
  }

  async findAll() {
    return await this.prisma.payment.findMany({
      include: {
        courses: true,
        user: true,
        promocodes: true,
        refunds: true,
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        courses: true,
        user: true,
        promocodes: true,
        refunds: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment ID ${id} topilmadi`);
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const exists = await this.prisma.payment.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Payment ID ${id} mavjud emas`);
    }

    return await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.payment.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException(`Payment ID ${id} mavjud emas`);
    }

    return await this.prisma.payment.delete({ where: { id } });
  }

  async getPaymentsByStatus(status: any) {
    return this.prisma.payment.findMany({
      where: {
        status: status,
      },
      include: {
        user: true,
        courses: true,
      },
    });
  }

  async getRevenueByCourses() {
    return this.prisma.payment.groupBy({
      by: ['coursesId'],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });
  }

  async getPaymentStatusStats() {
    return this.prisma.payment.groupBy({
      by: ['status'],
      _count: { status: true },
    });
  }

  async getPromoUserCount(promocodeId: number) {
    const users = await this.prisma.payment.groupBy({
      by: ['userId'],
      where: {
        promocodesId: promocodeId,
      },
    });

    return `${users.length} ta foydalnuvchi shu promocodeddan foydalanib to'lov amalga oshirgan!`;
  }
}
