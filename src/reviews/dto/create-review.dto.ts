import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Min,
  Max,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 5, description: 'Baholash (1 dan 5 gacha)' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Kurs juda foydali edi', description: 'Sharh' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: '2025-08-04T12:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  created_at?: string;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1, description: 'Kurs ID' })
  @IsInt()
  courseId: number;
}
