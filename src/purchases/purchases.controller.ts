import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SelfGuard, UserAccessTokenGuard } from '../common/guards';

@ApiTags('Sotib olishlar')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @UseGuards(UserAccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi sotib olish yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Sotib olish muvaffaqiyatli yaratildi',
  })
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @UseGuards(UserAccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha sotib olishlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha sotib olishlar qaytarildi' })
  findAll() {
    return this.purchasesService.findAll();
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha sotib olishni olish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Sotib olish ID raqami',
  })
  @ApiResponse({ status: 200, description: "So'ralgan sotib olish topildi" })
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(+id);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha sotib olishni yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan sotib olish ID si",
  })
  @ApiResponse({
    status: 200,
    description: 'Sotib olish muvaffaqiyatli yangilandi',
  })
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(+id, updatePurchaseDto);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha sotib olishni o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan sotib olish ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Sotib olish muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(+id);
  }
}
