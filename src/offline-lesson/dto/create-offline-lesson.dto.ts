// create-offline-lesson.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateOfflineLessonDto {
  @ApiProperty({ example: 'Python dasturlash' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Boshlang‘ich darajadagi Python kursi' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Toshkent shahri' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: '2025-09-01T00:00:00.000Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '2025-09-01T09:00:00.000Z' })
  @IsDateString()
  start_time: string;

  @ApiProperty({ example: '2025-09-01T12:00:00.000Z' })
  @IsDateString()
  end_time: string;

  @ApiProperty({ example: '3 soat' })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({ example: '150.00' })
  @IsNotEmpty()
  price: string; 

  @ApiProperty({ example: 20 })
  @IsInt()
  capacity: number;

  @ApiProperty({ example: false, default: false, required: false })
  @IsBoolean()
  @IsOptional()
  is_full?: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  instructorId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  regionId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  districtsId: number;
}
