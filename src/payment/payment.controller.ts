import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags("To'lovlar")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({ status: 201, description: "To'lov muvaffaqiyatli yaratildi" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha to'lovlarni olish" })
  @ApiResponse({ status: 200, description: "Barcha to'lovlar qaytarildi" })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha to'lovni olish" })
  @ApiParam({ name: 'id', type: 'number', description: "To'lovning ID raqami" })
  @ApiResponse({ status: 200, description: "So'ralgan to'lov topildi" })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha to'lovni yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan to'lov ID si",
  })
  @ApiResponse({ status: 200, description: "To'lov muvaffaqiyatli yangilandi" })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha to'lovni o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan to'lov ID si",
  })
  @ApiResponse({ status: 200, description: "To'lov muvaffaqiyatli o'chirildi" })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
