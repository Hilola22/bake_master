import { PartialType } from '@nestjs/swagger';
import { CreateCompletedTaskDto } from './create-completed_task.dto';

export class UpdateCompletedTaskDto extends PartialType(CreateCompletedTaskDto) {}
