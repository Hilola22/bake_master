import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.reviews.create({
      data: createReviewDto,
    });
  }

  async findAll() {
    return await this.prisma.reviews.findMany({
      include: {
        user: true,
        courses: true,
      },
    });
  }

  async findOne(id: number) {
    const review = await this.prisma.reviews.findUnique({
      where: { id },
      include: {
        user: true,
        courses: true,
      },
    });

    if (!review) {
      throw new NotFoundException(`Review ID ${id} topilmadi`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const exists = await this.prisma.reviews.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Review ID ${id} mavjud emas`);
    }

    return await this.prisma.reviews.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.reviews.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Review ID ${id} mavjud emas`);
    }

    return await this.prisma.reviews.delete({
      where: { id },
    });
  }
}
