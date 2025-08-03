import { Injectable } from '@nestjs/common';
import { CreateOfflineLessonDto } from './dto/create-offline-lesson.dto';
import { UpdateOfflineLessonDto } from './dto/update-offline-lesson.dto';

@Injectable()
export class OfflineLessonService {
  create(createOfflineLessonDto: CreateOfflineLessonDto) {
    return 'This action adds a new offlineLesson';
  }

  findAll() {
    return `This action returns all offlineLesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offlineLesson`;
  }

  update(id: number, updateOfflineLessonDto: UpdateOfflineLessonDto) {
    return `This action updates a #${id} offlineLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} offlineLesson`;
  }
}
