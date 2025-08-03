import { IsInt, IsPositive } from 'class-validator';
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
    example: 3,
    description: "Kategoriya ID raqami. Bu mavjud kategoriya bo'lishi kerak.",
  })
  @IsInt({ message: "categoryId butun son bo'lishi kerak" })
  @IsPositive({ message: "categoryId musbat son bo'lishi kerak." })
  categoryId: number;
}
