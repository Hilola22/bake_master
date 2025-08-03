import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompletedTasksService } from './completed_tasks.service';
import { CreateCompletedTaskDto } from './dto/create-completed_task.dto';
import { UpdateCompletedTaskDto } from './dto/update-completed_task.dto';

@Controller('completed-tasks')
export class CompletedTasksController {
  constructor(private readonly completedTasksService: CompletedTasksService) {}

  @Post()
  create(@Body() createCompletedTaskDto: CreateCompletedTaskDto) {
    return this.completedTasksService.create(createCompletedTaskDto);
  }

  @Get()
  findAll() {
    return this.completedTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completedTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompletedTaskDto: UpdateCompletedTaskDto) {
    return this.completedTasksService.update(+id, updateCompletedTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedTasksService.remove(+id);
  }
}
