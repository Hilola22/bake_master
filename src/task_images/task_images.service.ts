import { Injectable } from '@nestjs/common';
import { CreateTaskImageDto } from './dto/create-task_image.dto';
import { UpdateTaskImageDto } from './dto/update-task_image.dto';

@Injectable()
export class TaskImagesService {
  create(createTaskImageDto: CreateTaskImageDto) {
    return 'This action adds a new taskImage';
  }

  findAll() {
    return `This action returns all taskImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskImage`;
  }

  update(id: number, updateTaskImageDto: UpdateTaskImageDto) {
    return `This action updates a #${id} taskImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskImage`;
  }
}
