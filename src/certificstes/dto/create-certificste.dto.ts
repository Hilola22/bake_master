import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCertificsteDto {
  @ApiProperty({
    example: true,
    description: "Foydalanuvchi kursni to'liq tamomlaganmi yoki yo'qligi.",
    default: false,
  })
  @IsBoolean({
    message: "is_completed qiymati boolean (true yoki false) bo'lishi kerak.",
  })
  is_completed: boolean;

  @ApiProperty({
    example: "https://example.com/certificates/123.pdf",
    description: "Sertifikat faylining URL manzili.",
  })
  @IsString({ message: "certificate_url matn (string) bo'lishi kerak." })
  @IsNotEmpty({ message: "certificate_url bo'sh bo'lmasligi kerak." })
  certificate_url: string;

  @ApiProperty({
    example: "2025-08-03T10:00:00.000Z",
    description: "Sertifikat berilgan sana (ISO formatda).",
  })
  @IsDateString(
    {},
    { message: "issued_at ISO formatdagi sana bo'lishi kerak." },
  )
  issued_at?: string;

  @ApiProperty({
    example: true,
    description: "Kurs uchun to'liq to'lov qilinganmi yoki yo'q.",
    default: false,
  })
  @IsBoolean({
    message: "is_fully_paid qiymati boolean (true yoki false) bo'lishi kerak.",
  })
  is_fully_paid: boolean;

  @ApiProperty({
    example: 5,
    description: "Foydalanuvchi ID raqami (User jadvalidan).",
  })
  @IsInt({ message: "userId butun son bo'lishi kerak." })
  userId: number;

  @ApiProperty({
    example: 12,
    description: "Kurs ID raqami (Courses jadvalidan).",
  })
  @IsInt({ message: "courseId butun son bo'lishi kerak." })
  courseId: number;
}