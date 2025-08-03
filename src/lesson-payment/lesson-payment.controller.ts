import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LessonPaymentService } from './lesson-payment.service';
import { CreateLessonPaymentDto } from './dto/create-lesson-payment.dto';
import { UpdateLessonPaymentDto } from './dto/update-lesson-payment.dto';

@Controller('lesson-payment')
export class LessonPaymentController {
  constructor(private readonly lessonPaymentService: LessonPaymentService) {}

  @Post()
  create(@Body() createLessonPaymentDto: CreateLessonPaymentDto) {
    return this.lessonPaymentService.create(createLessonPaymentDto);
  }

  @Get()
  findAll() {
    return this.lessonPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonPaymentDto: UpdateLessonPaymentDto) {
    return this.lessonPaymentService.update(+id, updateLessonPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonPaymentService.remove(+id);
  }
}
