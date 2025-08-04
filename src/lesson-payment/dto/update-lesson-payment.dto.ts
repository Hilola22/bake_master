import { PartialType } from '@nestjs/swagger';
import { CreateLessonsPaymentDto } from './create-lesson-payment.dto';

export class UpdateLessonPaymentDto extends PartialType(CreateLessonsPaymentDto) {}
