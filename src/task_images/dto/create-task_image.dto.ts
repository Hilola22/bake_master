import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTaskImageDto {
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Rasm URL manzili',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    example: 'Tugallangan vazifa rasmi',
    description: 'Rasm tavsifi',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'Tugallangan vazifa ID si' })
  @IsInt()
  completedTasksId: number;
}
