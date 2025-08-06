import { IsInt, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategoryDto {
  @ApiProperty({
    example: 1,
    description:
      "Kursning ID raqami. Bu mavjud kursga tegishli bo'lishi kerak.",
  })
  @IsInt({ message: "courseId butun son bo'lishi kerak." })
  @IsPositive({ message: "courseId musbat son bo'lishi kerak." })
  courseId: number;

  @ApiProperty({
    example: 'Shirinliklar',
    description: "Bu yerda kategoriya nomi bo'lishi kerak.",
  })
  @IsString({ message: "category nomi bo'lishi kerak" })
  category: string;
}
