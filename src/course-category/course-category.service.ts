import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseCategoryDto: CreateCourseCategoryDto) {
    const { courseId, category } = createCourseCategoryDto;

    const course = await this.prismaService.courses.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return this.prismaService.courseCategory.create({
      data: createCourseCategoryDto
    });
  }

  findAll() {
    return this.prismaService.courseCategory.findMany({
      include: {
        courses: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const relation = await this.prismaService.courseCategory.findUnique({
      where: { id },
      include: {
        courses: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!relation) {
      throw new NotFoundException('Course-category relation not found');
    }

    return relation;
  }

  async update(id: number, updateCourseCategoryDto: UpdateCourseCategoryDto) {
    const existing = await this.prismaService.courseCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Relation not found');
    }

    return this.prismaService.courseCategory.update({
      where: { id },
      data: updateCourseCategoryDto,
    });
  }

  async remove(id: number) {
    const relation = await this.prismaService.courseCategory.findUnique({
      where: { id },
    });

    if (!relation) {
      throw new NotFoundException('Relation not found');
    }

    await this.prismaService.courseCategory.delete({ where: { id } });

    return { message: 'Course-category relation deleted successfully' };
  }
}
