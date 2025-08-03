import { Module } from '@nestjs/common';
import { LessonPaymentService } from './lesson-payment.service';
import { LessonPaymentController } from './lesson-payment.controller';

@Module({
  controllers: [LessonPaymentController],
  providers: [LessonPaymentService],
})
export class LessonPaymentModule {}
