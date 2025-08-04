import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonPaymentService } from './lesson-payment.service';
import { CreateLessonsPaymentDto } from './dto/create-lesson-payment.dto';
import { UpdateLessonPaymentDto } from './dto/update-lesson-payment.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("Dars to'lovlari")
@Controller('lesson-payment')
export class LessonPaymentController {
  constructor(private readonly lessonPaymentService: LessonPaymentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi dars to'lovini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Dars to'lov muvaffaqiyatli yaratildi",
  })
  create(@Body() createLessonPaymentDto: CreateLessonsPaymentDto) {
    return this.lessonPaymentService.create(createLessonPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha dars to'lovlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha dars to'lovlari qaytarildi",
  })
  findAll() {
    return this.lessonPaymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha dars to'lovini olish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Dars to'lovining ID raqami",
  })
  @ApiResponse({ status: 200, description: "So'ralgan dars to'lov topildi" })
  findOne(@Param('id') id: string) {
    return this.lessonPaymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha dars to'lovini yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan dars to'lovining ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Dars to'lov muvaffaqiyatli yangilandi",
  })
  update(
    @Param('id') id: string,
    @Body() updateLessonPaymentDto: UpdateLessonPaymentDto,
  ) {
    return this.lessonPaymentService.update(+id, updateLessonPaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha dars to'lovini o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chiriladigan dars to'lovining ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Dars to'lov muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.lessonPaymentService.remove(+id);
  }
}
