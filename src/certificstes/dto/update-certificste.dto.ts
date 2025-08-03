import { PartialType } from '@nestjs/swagger';
import { CreateCertificsteDto } from './create-certificste.dto';

export class UpdateCertificsteDto extends PartialType(CreateCertificsteDto) {}
