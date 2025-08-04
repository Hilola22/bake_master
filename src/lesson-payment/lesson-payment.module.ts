import { Module } from '@nestjs/common';
import { LessonPaymentService } from './lesson-payment.service';
import { LessonPaymentController } from './lesson-payment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonPaymentController],
  providers: [LessonPaymentService],
})
export class LessonPaymentModule {}
