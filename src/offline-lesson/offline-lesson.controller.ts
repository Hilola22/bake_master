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
import { OfflineLessonService } from './offline-lesson.service';
import { CreateOfflineLessonDto } from './dto/create-offline-lesson.dto';
import { UpdateOfflineLessonDto } from './dto/update-offline-lesson.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { InstructorAccessTokenGuard, SelfGuard } from '../common/guards';

@ApiTags('Oflayn darslar')
@Controller('offline-lesson')
export class OfflineLessonController {
  constructor(private readonly offlineLessonService: OfflineLessonService) {}

  @UseGuards(InstructorAccessTokenGuard)
  @ApiBearerAuth('token')
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

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
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

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
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

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
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
