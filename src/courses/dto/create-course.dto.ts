import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    example: 1,
    description: 'Ustoz (oshpaz) ID raqami',
  })
  @IsNumber()
  @IsPositive()
  instructor_id: number;

  @ApiProperty({
    example: 'Shokoladli tort tayyorlash',
    description: "Kurs nomi (qanday pishiriq o'rgatiladi)",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      "Bu video darslikda siz shokoladli tortni bosqichma-bosqich tayyorlashni o'rganasiz. Har bir bosqich batafsil tushuntirilgan.",
    description: 'Kurs tavsifi',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 9.99,
    description: 'Kurs narxi (USD)',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'https://example.com/videos/shokoladli-tort.mp4',
    description: 'Darslik videosi URL manzili',
  })
  @IsString()
  @IsNotEmpty()
  video_url: string;

  @ApiProperty({
    example: 'https://example.com/images/tort-thumbnail.jpg',
    description: 'Kurs uchun rasm (thumbnail)',
  })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    example: '45 daqiqa',
    description: 'Dars davomiyligi (masalan: 45 daqiqa)',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    example: '30 kun',
    description: 'Kursga kirish huquqi davomiyligi',
  })
  @IsString()
  @IsNotEmpty()
  access_duration: string;
}
