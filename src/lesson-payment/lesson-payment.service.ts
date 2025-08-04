import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonsPaymentDto } from './dto/create-lesson-payment.dto';
import { UpdateLessonPaymentDto } from './dto/update-lesson-payment.dto';

@Injectable()
export class LessonPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLessonPaymentDto: CreateLessonsPaymentDto) {
    return await this.prisma.lessonsPayment.create({
      data: createLessonPaymentDto,
    });
  }

  async findAll() {
    return await this.prisma.lessonsPayment.findMany({
      include: {
        User: true,
        OfflineLesson: true,
        Promocodes: true,
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.lessonsPayment.findUnique({
      where: { id },
      include: {
        User: true,
        OfflineLesson: true,
        Promocodes: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`LessonPayment ID ${id} topilmadi`);
    }

    return payment;
  }

  async update(id: number, updateLessonPaymentDto: UpdateLessonPaymentDto) {
    const exists = await this.prisma.lessonsPayment.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`LessonPayment ID ${id} mavjud emas`);
    }

    return await this.prisma.lessonsPayment.update({
      where: { id },
      data: updateLessonPaymentDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.lessonsPayment.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`LessonPayment ID ${id} mavjud emas`);
    }

    return await this.prisma.lessonsPayment.delete({
      where: { id },
    });
  }
}
