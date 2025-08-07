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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SelfGuard, UserAccessTokenGuard } from '../common/guards';

@ApiTags('Sharhlar')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi sharh yaratish' })
  @ApiResponse({ status: 201, description: 'Sharh muvaffaqiyatli yaratildi' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha sharhlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha sharhlar qaytarildi' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha sharhni olish" })
  @ApiParam({ name: 'id', type: 'number', description: 'Sharh ID raqami' })
  @ApiResponse({ status: 200, description: "So'ralgan sharh topildi" })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha sharhni yangilash" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "Yangilanishi kerak bo'lgan sharh ID si",
  })
  @ApiResponse({ status: 200, description: 'Sharh muvaffaqiyatli yangilandi' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha sharhni o'chirish" })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: "O'chirilishi kerak bo'lgan sharh ID si",
  })
  @ApiResponse({ status: 200, description: "Sharh muvaffaqiyatli o'chirildi" })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
