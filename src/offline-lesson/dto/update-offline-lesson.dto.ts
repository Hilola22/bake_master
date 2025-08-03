import { PartialType } from '@nestjs/swagger';
import { CreateOfflineLessonDto } from './create-offline-lesson.dto';

export class UpdateOfflineLessonDto extends PartialType(CreateOfflineLessonDto) {}
