import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfflineLessonService } from './offline-lesson.service';
import { CreateOfflineLessonDto } from './dto/create-offline-lesson.dto';
import { UpdateOfflineLessonDto } from './dto/update-offline-lesson.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Oflayn darslar')
@Controller('offline-lesson')
export class OfflineLessonController {
  constructor(private readonly offlineLessonService: OfflineLessonService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi oflayn dars yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Oflayn dars muvaffaqiyatli yaratildi',
  })
  create(@Body() createOfflineLessonDto: CreateOfflineLessonDto) {
    return this.offlineLessonService.create(createOfflineLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha oflayn darslarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha oflayn darslar qaytarildi' })
  findAll() {
    return this.offlineLessonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha oflayn darsni olish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Oflayn darsning ID raqami',
  })
  @ApiResponse({ status: 200, description: "So'ralgan oflayn dars topildi" })
  findOne(@Param('id') id: string) {
    return this.offlineLessonService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha oflayn darsni yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan oflayn dars ID si",
  })
  @ApiResponse({
    status: 200,
    description: 'Ofllayn dars muvaffaqiyatli yangilandi',
  })
  update(
    @Param('id') id: string,
    @Body() updateOfflineLessonDto: UpdateOfflineLessonDto,
  ) {
    return this.offlineLessonService.update(+id, updateOfflineLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha oflayn darsni o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan oflayn dars ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Ofllayn dars muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.offlineLessonService.remove(+id);
  }
}
