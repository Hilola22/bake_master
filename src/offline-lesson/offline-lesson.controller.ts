import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfflineLessonService } from './offline-lesson.service';
import { CreateOfflineLessonDto } from './dto/create-offline-lesson.dto';
import { UpdateOfflineLessonDto } from './dto/update-offline-lesson.dto';

@Controller('offline-lesson')
export class OfflineLessonController {
  constructor(private readonly offlineLessonService: OfflineLessonService) {}

  @Post()
  create(@Body() createOfflineLessonDto: CreateOfflineLessonDto) {
    return this.offlineLessonService.create(createOfflineLessonDto);
  }

  @Get()
  findAll() {
    return this.offlineLessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offlineLessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfflineLessonDto: UpdateOfflineLessonDto) {
    return this.offlineLessonService.update(+id, updateOfflineLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offlineLessonService.remove(+id);
  }
}
