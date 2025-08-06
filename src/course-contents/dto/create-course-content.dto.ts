import { IsString, IsNotEmpty, IsInt, IsUrl, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCourseContentDto {
  @ApiProperty({
    example: 'Pishirish uchun kirish qism',
    description: "Bo'lim sarlavhasi",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/cooking-intro-video.mp4',
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
    example: 'Oddiy non pishirish uchun retseptni yaratish',
    description: 'Vazifa matni',
  })
  @IsString()
  @IsNotEmpty()
  task: string;

  @ApiProperty({
    example: 'Un, Suv, Tuz, Xamirturush',
    description: "Kerakli mahsulotlar ro'yxati",
  })
  @IsString()
  @IsNotEmpty()
  ingredients: string;

  @ApiProperty({
    example: 'gramm, choy qoshiq',
    description: "O'lchov birliklari",
  })
  @IsString()
  @IsNotEmpty()
  measurement: string;

  @ApiProperty({ example: 1, description: 'Kurs ID raqami' })
  @IsInt()
  @Type(() => Number)
  courseId: number;
}
