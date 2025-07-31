import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Adminlar')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi.' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({ status: 200, description: "Barcha adminlar ro'yxati." })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta adminni olish' })
  @ApiResponse({ status: 200, description: 'Admin topildi.' })
  @ApiResponse({ status: 404, description: 'Admin topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Admin ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: 'Admin yangilandi.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 200, description: "Admin o'chirildi." })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
