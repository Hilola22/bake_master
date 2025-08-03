import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CourseCategoryService } from './course-category.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';

@ApiTags('Kurs Kategoriyasi')
@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kurs kategoriyasini yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Kurs kategoriyasi muvaffaqiyatli yaratildi.',
  })
  create(@Body() createCourseCategoryDto: CreateCourseCategoryDto) {
    return this.courseCategoryService.create(createCourseCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kurs kategoriyalarini ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Barcha kurs kategoriyalari ro'yxati",
  })
  findAll() {
    return this.courseCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha bitta kurs kategoriyasini ko'rish" })
  @ApiParam({ name: 'id', description: 'Kurs kategoriyasining ID raqami' })
  @ApiResponse({
    status: 200,
    description: 'Tanlangan kurs kategoriyasi topildi',
  })
  findOne(@Param('id') id: string) {
    return this.courseCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha kurs kategoriyasini yangilash" })
  @ApiParam({ name: 'id', description: "Kurs kategoriyasining ID raqam"})
  @ApiResponse({
    status: 200,
    description: 'Kurs kategoriyasi muvaffaqiyatli yangilandi',
  })
  update(
    @Param('id') id: string,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ) {
    return this.courseCategoryService.update(+id, updateCourseCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha kurs kategoriyasini o'chirish" })
  @ApiParam({ name: 'id', description: "Kurs kategoriyasining ID raqami"})
  @ApiResponse({
    status: 200,
    description: "Kurs kategoriyasi muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.courseCategoryService.remove(+id);
  }
}
