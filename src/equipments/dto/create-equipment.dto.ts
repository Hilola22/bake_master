import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({
    example: 'Mikser',
    description: 'Ushbu kurs kontentida ishlatiladigan jihoz nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Xamirni aralashtirish uchun elektr mikser',
    description: 'Jihoz haqida qisqacha tavsif',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 5,
    description:
      'Qaysi kurs kontentiga tegishli ekanligini bildiruvchi ID (course_contents_id)',
  })
  @IsNumber()
  @IsPositive()
  course_contents_id: number;
}
