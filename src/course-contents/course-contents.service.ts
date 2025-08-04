import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';

@Injectable()
export class CourseContentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCourseContentDto) {
    return this.prisma.courseContents.create({
      data: dto
    });
  }

  async findAll() {
    return this.prisma.courseContents.findMany();
  }

  async findOne(id: number) {
    const content = await this.prisma.courseContents.findUnique({
      where: { id },
    });
    if (!content) {
      throw new NotFoundException(`CourseContent with ID ${id} not found`);
    }
    return content;
  }

  async update(id: number, dto: UpdateCourseContentDto) {
    const existing = await this.prisma.courseContents.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`CourseContent with ID ${id} not found`);
    }

    return this.prisma.courseContents.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.courseContents.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`CourseContent with ID ${id} not found`);
    }

    return this.prisma.courseContents.delete({
      where: { id },
    });
  }
}
