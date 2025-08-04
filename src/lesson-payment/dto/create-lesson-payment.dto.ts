import {
  IsDecimal,
  IsEnum,
  IsDateString,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PayMethod, PayStatus } from '../../../generated/prisma';

export class CreateLessonsPaymentDto {
  @ApiProperty({ example: 150000.5, description: `To'lov summasi` })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: `CASH`,
    enum: PayMethod,
    description: `To'lov turi (PayMethod enum)`,
  })
  @IsEnum(PayMethod)
  @IsNotEmpty()
  payment_method: PayMethod;

  @ApiProperty({
    example: `2025-08-04T10:00:00Z`,
    description: `To'lov qilingan vaqt (optional, default: now)`,
  })
  @IsDateString()
  paid_at?: Date;

  @ApiProperty({ example: 10000.0, description: `Chegirma summasi` })
  @IsDecimal()
  @IsNotEmpty()
  discount_amount: number;

  @ApiProperty({
    example: `PAID`,
    enum: PayStatus,
    description: `To'lov holati (PayStatus enum)`,
  })
  @IsEnum(PayStatus)
  @IsNotEmpty()
  status: PayStatus;

  @ApiProperty({ example: 1, description: `Foydalanuvchi ID raqami (User)` })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 3,
    description: `Offline dars ID raqami (OfflineLesson)`,
  })
  @IsInt()
  @IsNotEmpty()
  offlineLessonId: number;

  @ApiProperty({ example: 2, description: `Promokod ID raqami (Promocodes)` })
  @IsInt()
  @IsNotEmpty()
  promocodesId: number;
}
