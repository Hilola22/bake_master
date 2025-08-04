import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDateString,
  IsOptional,
  Min,
} from 'class-validator';
import { DiscountType } from '../../../generated/prisma';

export class CreatePromocodeDto {
  @ApiProperty({ example: 'SUMMER2025' })
  @IsString()
  code: string;

  @ApiProperty({ enum: DiscountType })
  @IsEnum(DiscountType)
  discount_type: DiscountType;

  @ApiProperty({ example: '10.50' })
  discount_value: string; 

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  usage_limit: number;

  @ApiProperty({ example: 0, required: false })
  @IsInt()
  @Min(0)
  used_count: number;

  @ApiProperty({ example: '2025-08-01T00:00:00.000Z', required: false })
  @IsDateString()
  valid_from: string;

  @ApiProperty({ example: '2025-12-31T23:59:59.000Z', required: false })
  @IsDateString()
  valid_to: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  paymentId: number;
}
