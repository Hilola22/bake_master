import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateRefundDto {
  @ApiProperty({ example: "To'lovdan voz kechish sababi"})
  @IsString()
  reason: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  is_confirmed: boolean;

  @ApiProperty({ example: '50000.00' })
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ example: '2025-08-04T12:00:00.000Z', required: false })
  @IsDateString()
  refunded_at: string;

  @ApiProperty({ example: '2025-09-04T12:00:00.000Z' })
  @IsDateString()
  refund_deadline: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  paymentId: number;
}
