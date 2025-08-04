import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("To'lovni qaytarish")
@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi qaytarish yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Qaytarish muvaffaqiyatli yaratildi',
  })
  create(@Body() createRefundDto: CreateRefundDto) {
    return this.refundsService.create(createRefundDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha qaytarishlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha qaytarishlar qaytarildi' })
  findAll() {
    return this.refundsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha qaytarishni olish" })
  @ApiParam({ name: 'id', type: 'number', description: 'Qaytarish ID raqami' })
  @ApiResponse({ status: 200, description: "So'ralgan qaytarish topildi" })
  findOne(@Param('id') id: string) {
    return this.refundsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha qaytarishni yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan qaytarish ID si",
  })
  @ApiResponse({
    status: 200,
    description: 'Qaytarish muvaffaqiyatli yangilandi',
  })
  update(@Param('id') id: string, @Body() updateRefundDto: UpdateRefundDto) {
    return this.refundsService.update(+id, updateRefundDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha qaytarishni o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan qaytarish ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Qaytarish muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.refundsService.remove(+id);
  }
}
