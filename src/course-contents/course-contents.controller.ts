import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseContentsService } from './course-contents.service';
import { CreateCourseContentDto } from './dto/create-course-content.dto';
import { UpdateCourseContentDto } from './dto/update-course-content.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Kurs mazmunlari') // Swagger'da bo'lim nomi
@Controller('course-contents')
export class CourseContentsController {
  constructor(private readonly courseContentsService: CourseContentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kurs kontentini yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Kurs kontenti muvaffaqiyatli yaratildi.',
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumot yuborildi." })
  create(@Body() createCourseContentDto: CreateCourseContentDto) {
    return this.courseContentsService.create(createCourseContentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kurs kontentlarini olish' })
  @ApiResponse({ status: 200, description: "Barcha kontentlar ro'yxati." })
  findAll() {
    return this.courseContentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta kurs kontentini olish' })
  @ApiResponse({ status: 200, description: 'Tanlangan kontent topildi.' })
  @ApiResponse({ status: 404, description: 'Kontent topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.courseContentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kurs kontentini yangilash' })
  @ApiResponse({
    status: 200,
    description: "Kontent muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({
    status: 404,
    description: "Yangilamoqchi bo'lgan kontent topilmadi.",
  })
  update(
    @Param('id') id: string,
    @Body() updateCourseContentDto: UpdateCourseContentDto,
  ) {
    return this.courseContentsService.update(+id, updateCourseContentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Kurs kontentini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kontent muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Kontent topilmadi." })
  remove(@Param('id') id: string) {
    return this.courseContentsService.remove(+id);
  }
}
