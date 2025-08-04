import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { MoneyCurrency, PayMethod, PayStatus } from '../../../generated/prisma';
export class CreatePaymentDto {
  @ApiProperty({ enum: PayMethod })
  @IsEnum(PayMethod)
  payment_method: PayMethod;

  @ApiProperty({
    enum: MoneyCurrency,
    default: MoneyCurrency.UZS,
    required: false,
  })
  @IsEnum(MoneyCurrency)
  @IsOptional()
  currency?: MoneyCurrency;

  @ApiProperty({ example: '100000.00' })
  @IsNotEmpty()
  amount: string; 

  @ApiProperty({ enum: PayStatus })
  @IsEnum(PayStatus)
  status: PayStatus;

  @ApiProperty({ example: '2025-08-04T12:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  paid_at?: string;

  @ApiProperty({ example: '2025-09-04T12:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  access_expires?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  coursesId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;
}
