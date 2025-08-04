import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { PayStatus } from '../../../generated/prisma';

export class CreatePurchaseDto {
  @ApiProperty({ example: '150000.00' })
  @IsNotEmpty()
  amount_paid: string; 

  @ApiProperty({ enum: PayStatus, default: PayStatus.UNPAID, required: false })
  @IsEnum(PayStatus)
  payment_status: PayStatus;

  @ApiProperty({ example: '2025-08-04T12:00:00.000Z', required: false })
  @IsDateString()
  payment_date: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  courseId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;
}
