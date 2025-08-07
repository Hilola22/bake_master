import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const {
      instructor_id,
      title,
      description,
      price,
      video_url,
      thumbnail,
      duration,
      access_duration,
    } = createCourseDto;

    const instructor = await this.prismaService.user.findUnique({
      where: { id: instructor_id },
    });

    if (!instructor) {
      throw new BadRequestException('Instructor not found');
    }

    return this.prismaService.courses.create({
      data: {
        instructor_id,
        title,
        description,
        price,
        video_url,
        thumbnail,
        duration,
        access_duration,
      },
      include: {
        instructor: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.courses.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prismaService.courses.findUnique({
      where: { id },
      include: {
        instructor: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const existing = await this.prismaService.courses.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    return this.prismaService.courses.update({
      where: { id },
      data: updateCourseDto,
      include: {
        instructor: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const course = await this.prismaService.courses.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.prismaService.courses.delete({ where: { id } });
    return { message: 'Course deleted successfully' };
  }

  async getBestSellingCourses() {
    return this.prismaService.courses.findMany({
      take: 1,
      orderBy: {
        purchases: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: {
            purchases: true,
          },
        },
      },
    });
  }
}
