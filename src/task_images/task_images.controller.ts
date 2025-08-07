import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TaskImagesService } from './task_images.service';
import { CreateTaskImageDto } from './dto/create-task_image.dto';
import { UpdateTaskImageDto } from './dto/update-task_image.dto';
import { SelfGuard, UserAccessTokenGuard } from '../common/guards';

@ApiTags('Vazifa rasmlari')
@Controller('task-images')
export class TaskImagesController {
  constructor(private readonly taskImagesService: TaskImagesService) {}

  @UseGuards(UserAccessTokenGuard)
  @ApiBearerAuth('token')
  @Post()
  @ApiOperation({ summary: 'Yangi vazifa rasmi yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Vazifa rasmi muvaffaqiyatli yaratildi',
  })
  create(@Body() createTaskImageDto: CreateTaskImageDto) {
    return this.taskImagesService.create(createTaskImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha vazifa rasmlarini olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha vazifa rasmlari qaytarildi',
  })
  findAll() {
    return this.taskImagesService.findAll();
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha vazifa rasmini olish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Vazifa rasmi ID raqami',
  })
  @ApiResponse({ status: 200, description: "So'ralgan vazifa rasmi topildi" })
  findOne(@Param('id') id: string) {
    return this.taskImagesService.findOne(+id);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha vazifa rasmini yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan vazifa rasmi ID si",
  })
  @ApiResponse({
    status: 200,
    description: 'Vazifa rasmi muvaffaqiyatli yangilandi',
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskImageDto: UpdateTaskImageDto,
  ) {
    return this.taskImagesService.update(+id, updateTaskImageDto);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha vazifa rasmini o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan vazifa rasmi ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Vazifa rasmi muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.taskImagesService.remove(+id);
  }
}
