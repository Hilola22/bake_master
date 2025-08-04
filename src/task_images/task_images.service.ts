import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskImageDto } from './dto/create-task_image.dto';
import { UpdateTaskImageDto } from './dto/update-task_image.dto';

@Injectable()
export class TaskImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskImageDto: CreateTaskImageDto) {
    return await this.prisma.taskImages.create({
      data: createTaskImageDto,
    });
  }

  async findAll() {
    return await this.prisma.taskImages.findMany({
      include: {
        completedTasks: true,
      },
    });
  }

  async findOne(id: number) {
    const taskImage = await this.prisma.taskImages.findUnique({
      where: { id },
      include: {
        completedTasks: true,
      },
    });

    if (!taskImage) {
      throw new NotFoundException(`TaskImage ID ${id} topilmadi`);
    }

    return taskImage;
  }

  async update(id: number, updateTaskImageDto: UpdateTaskImageDto) {
    const exists = await this.prisma.taskImages.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`TaskImage ID ${id} mavjud emas`);
    }

    return await this.prisma.taskImages.update({
      where: { id },
      data: updateTaskImageDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.taskImages.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`TaskImage ID ${id} mavjud emas`);
    }

    return await this.prisma.taskImages.delete({
      where: { id },
    });
  }
}
