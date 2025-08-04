import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompletedTasksService } from './completed_tasks.service';
import { CreateCompletedTaskDto } from './dto/create-completed_task.dto';
import { UpdateCompletedTaskDto } from './dto/update-completed_task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Bajariladigan vazifalar')
@Controller('completed-tasks')
export class CompletedTasksController {
  constructor(private readonly completedTasksService: CompletedTasksService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi bajarilgan topshiriq yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Topshiriq muvaffaqiyatli yaratildi',
  })
  create(@Body() createCompletedTaskDto: CreateCompletedTaskDto) {
    return this.completedTasksService.create(createCompletedTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha bajarilgan topshiriqlarni olish' })
  @ApiResponse({ status: 200, description: "Barcha topshiriqlar ro'yxati" })
  findAll() {
    return this.completedTasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali bajarilgan topshiriqni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan topshiriq' })
  findOne(@Param('id') id: string) {
    return this.completedTasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID orqali bajarilgan topshiriqni tahrirlash' })
  @ApiResponse({ status: 200, description: 'Topshiriq yangilandi' })
  update(
    @Param('id') id: string,
    @Body() updateCompletedTaskDto: UpdateCompletedTaskDto,
  ) {
    return this.completedTasksService.update(+id, updateCompletedTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID orqali bajarilgan topshiriqni o'chirish" })
  @ApiResponse({ status: 200, description: "Topshiriq o'chirildi" })
  remove(@Param('id') id: string) {
    return this.completedTasksService.remove(+id);
  }
}
