import { PartialType } from '@nestjs/swagger';
import { CreateLessonPaymentDto } from './create-lesson-payment.dto';

export class UpdateLessonPaymentDto extends PartialType(CreateLessonPaymentDto) {}
