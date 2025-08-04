import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfflineLessonDto } from './dto/create-offline-lesson.dto';
import { UpdateOfflineLessonDto } from './dto/update-offline-lesson.dto';

@Injectable()
export class OfflineLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOfflineLessonDto: CreateOfflineLessonDto) {
    return await this.prisma.offlineLesson.create({
      data: createOfflineLessonDto,
    });
  }

  async findAll() {
    return await this.prisma.offlineLesson.findMany({
      include: {
        instructor: true,
        region: true,
        districts: true,
        lessons_payment: true,
      },
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.offlineLesson.findUnique({
      where: { id },
      include: {
        instructor: true,
        region: true,
        districts: true,
        lessons_payment: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException(`OfflineLesson ID ${id} topilmadi`);
    }

    return lesson;
  }

  async update(id: number, updateOfflineLessonDto: UpdateOfflineLessonDto) {
    const exists = await this.prisma.offlineLesson.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`OfflineLesson ID ${id} mavjud emas`);
    }

    return await this.prisma.offlineLesson.update({
      where: { id },
      data: updateOfflineLessonDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.offlineLesson.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`OfflineLesson ID ${id} mavjud emas`);
    }

    return await this.prisma.offlineLesson.delete({
      where: { id },
    });
  }
}
