import { Injectable } from '@nestjs/common';
import { CreateCompletedTaskDto } from './dto/create-completed_task.dto';
import { UpdateCompletedTaskDto } from './dto/update-completed_task.dto';

@Injectable()
export class CompletedTasksService {
  create(createCompletedTaskDto: CreateCompletedTaskDto) {
    return 'This action adds a new completedTask';
  }

  findAll() {
    return `This action returns all completedTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} completedTask`;
  }

  update(id: number, updateCompletedTaskDto: UpdateCompletedTaskDto) {
    return `This action updates a #${id} completedTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} completedTask`;
  }
}
