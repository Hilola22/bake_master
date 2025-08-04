import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompletedTaskDto } from './dto/create-completed_task.dto';
import { UpdateCompletedTaskDto } from './dto/update-completed_task.dto';

@Injectable()
export class CompletedTasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompletedTaskDto: CreateCompletedTaskDto) {
    return await this.prisma.completedTasks.create({
      data: {
        instructor_feedback: createCompletedTaskDto.instructor_feedback,
        message: createCompletedTaskDto.message,
        user: {
          connect: { id: createCompletedTaskDto.userId },
        },
        course_contents: {
          connect: { id: createCompletedTaskDto.course_contents_id },
        },
        task_images: {
          create:
            createCompletedTaskDto.task_images?.map((img) => ({
              image_url: img.image_url,
              description: img.description,
            })) || [],
        },
      },
      include: {
        task_images: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.completedTasks.findMany({
      include: {
        user: true,
        course_contents: true,
        task_images: true,
      },
    });
  }

  async findOne(id: number) {
    const completedTask = await this.prisma.completedTasks.findUnique({
      where: { id },
      include: {
        user: true,
        course_contents: true,
        task_images: true,
      },
    });

    if (!completedTask) {
      throw new NotFoundException(`CompletedTask with id ${id} not found`);
    }

    return completedTask;
  }

  async update(id: number, updateCompletedTaskDto: UpdateCompletedTaskDto) {
    const existing = await this.prisma.completedTasks.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`CompletedTask with id ${id} not found`);
    }

    return await this.prisma.completedTasks.update({
      where: { id },
      data: {
        instructor_feedback: updateCompletedTaskDto.instructor_feedback,
        message: updateCompletedTaskDto.message,
      },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.completedTasks.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`CompletedTask with id ${id} not found`);
    }

    return await this.prisma.completedTasks.delete({
      where: { id },
    });
  }
}
