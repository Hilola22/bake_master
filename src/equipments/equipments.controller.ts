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
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InstructorAdminAccessTokenGuard, SelfGuard } from '../common/guards';

@ApiTags('Jihozlar')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @UseGuards(InstructorAdminAccessTokenGuard)
  @ApiBearerAuth('token')
  @Post()
  @ApiOperation({ summary: "Yangi jihoz qo'shish" })
  @ApiResponse({ status: 201, description: 'Jihoz muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumot yuborildi." })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha jihozlarni olish' })
  @ApiResponse({ status: 200, description: "Jihozlar ro'yxati." })
  findAll() {
    return this.equipmentsService.findAll();
  }

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha bitta jihoz olish" })
  @ApiResponse({ status: 200, description: 'Jihoz topildi.' })
  @ApiResponse({ status: 404, description: 'Jihoz topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: "Jihoz ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: 'Jihoz muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Jihoz topilmadi.' })
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.update(+id, updateEquipmentDto);
  }

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "Jihozni o'chirish" })
  @ApiResponse({ status: 200, description: "Jihoz muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: 'Jihoz topilmadi.' })
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(+id);
  }
}
