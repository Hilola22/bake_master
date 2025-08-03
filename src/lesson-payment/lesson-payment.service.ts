import { Injectable } from '@nestjs/common';
import { CreateLessonPaymentDto } from './dto/create-lesson-payment.dto';
import { UpdateLessonPaymentDto } from './dto/update-lesson-payment.dto';

@Injectable()
export class LessonPaymentService {
  create(createLessonPaymentDto: CreateLessonPaymentDto) {
    return 'This action adds a new lessonPayment';
  }

  findAll() {
    return `This action returns all lessonPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonPayment`;
  }

  update(id: number, updateLessonPaymentDto: UpdateLessonPaymentDto) {
    return `This action updates a #${id} lessonPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonPayment`;
  }
}
