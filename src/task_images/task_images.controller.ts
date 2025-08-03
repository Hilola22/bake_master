import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskImagesService } from './task_images.service';
import { CreateTaskImageDto } from './dto/create-task_image.dto';
import { UpdateTaskImageDto } from './dto/update-task_image.dto';

@Controller('task-images')
export class TaskImagesController {
  constructor(private readonly taskImagesService: TaskImagesService) {}

  @Post()
  create(@Body() createTaskImageDto: CreateTaskImageDto) {
    return this.taskImagesService.create(createTaskImageDto);
  }

  @Get()
  findAll() {
    return this.taskImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskImageDto: UpdateTaskImageDto) {
    return this.taskImagesService.update(+id, updateTaskImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskImagesService.remove(+id);
  }
}
