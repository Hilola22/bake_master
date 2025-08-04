import { IsString, IsNotEmpty, IsInt, IsUrl, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCourseContentDto {
  @ApiProperty({
    example: 'JavaScript Introduction',
    description: "Bo'lim sarlavhasi",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'Video manzili (URL)',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  video_url: string;

  @ApiProperty({ example: 1, description: 'Tartib raqami' })
  @IsInt()
  @Type(() => Number)
  order: number;

  @ApiProperty({
    example: 'Create a simple function in JavaScript',
    description: 'Vazifa matni',
  })
  @IsString()
  @IsNotEmpty()
  task: string;

  @ApiProperty({
    example: 'Sugar, Flour, Eggs',
    description: "Kerakli mahsulotlar ro'yxati",
  })
  @IsString()
  @IsNotEmpty()
  ingredients: string;

  @ApiProperty({ example: 'grams, pieces', description: "O'lchov birliklari" })
  @IsString()
  @IsNotEmpty()
  measurement: string;

  @ApiProperty({ example: 1, description: 'Kurs ID raqami' })
  @IsInt()
  @Type(() => Number)
  courseId: number;
}
