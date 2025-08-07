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
import { PromocodesService } from './promocodes.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { InstructorAccessTokenGuard, SelfGuard } from '../common/guards';

@ApiTags('Promo kodlar')
@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodesService) {}

  @UseGuards(InstructorAccessTokenGuard)
  @ApiBearerAuth('token')
  @Post()
  @ApiOperation({ summary: 'Yangi promo kod yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Promo kod muvaffaqiyatli yaratildi',
  })
  create(@Body() createPromocodeDto: CreatePromocodeDto) {
    return this.promocodeService.create(createPromocodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha promo kodlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha promo kodlar qaytarildi' })
  findAll() {
    return this.promocodeService.findAll();
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha promo kodni olish" })
  @ApiParam({ name: 'id', type: 'number', description: 'Promo kod ID raqami' })
  @ApiResponse({ status: 200, description: "So'ralgan promo kod topildi" })
  findOne(@Param('id') id: string) {
    return this.promocodeService.findOne(+id);
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha promo kodni yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan promo kod ID si",
  })
  @ApiResponse({
    status: 200,
    description: 'Promo kod muvaffaqiyatli yangilandi',
  })
  update(
    @Param('id') id: string,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
  ) {
    return this.promocodeService.update(+id, updatePromocodeDto);
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha promo kodni o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan promo kod ID si",
  })
  @ApiResponse({
    status: 200,
    description: "Promo kod muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.promocodeService.remove(+id);
  }
}
