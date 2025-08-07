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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InstructorAccessTokenGuard, SelfGuard } from '../common/guards';

@ApiTags('Kurslar')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(InstructorAccessTokenGuard)
  @ApiBearerAuth('token')
  @Post()
  @ApiOperation({ summary: 'Yangi kurs yaratish' })
  @ApiResponse({ status: 201, description: 'Kurs muvaffaqiyatli yaratildi.' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kurslarni olish' })
  @ApiResponse({ status: 200, description: "Kurslar ro'yxati qaytarildi." })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('best-sellers')
  getBestSellingCourses() {
    return this.coursesService.getBestSellingCourses();
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali kursni olish' })
  @ApiResponse({ status: 200, description: 'Kurs topildi.' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: 'Kursni yangilash' })
  @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli yangilandi.' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "Kursni o'chirish" })
  @ApiResponse({ status: 200, description: "Kurs muvaffaqiyatli o'chirildi." })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
