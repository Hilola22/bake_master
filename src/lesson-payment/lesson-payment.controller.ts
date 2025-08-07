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
import { LessonPaymentService } from './lesson-payment.service';
import { CreateLessonsPaymentDto } from './dto/create-lesson-payment.dto';
import { UpdateLessonPaymentDto } from './dto/update-lesson-payment.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { InstructorAdminAccessTokenGuard, SelfGuard, UserAccessTokenGuard } from '../common/guards';

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

  @UseGuards(InstructorAdminAccessTokenGuard)
  @ApiBearerAuth('token')
  @Get()
  @ApiOperation({ summary: "Barcha dars to'lovlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha dars to'lovlari qaytarildi",
  })
  findAll() {
    return this.lessonPaymentService.findAll();
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
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

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
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

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
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
