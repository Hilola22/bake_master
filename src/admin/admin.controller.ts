import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminAccessTokenGuard, SelfGuard } from '../common/guards';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SuperAdminAccessTokenGuard } from '../common/guards/superadmin-access-token.guard';

@ApiTags('Adminlar')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(SuperAdminAccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi.' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('activate/:code')
  async activate(@Param('code') code: string) {
    const user = await this.adminService.findAdminByActivationLink(code);
    if (!user) {
      throw new NotFoundException('Activation code not found');
    }

    await this.adminService.activateAdmin(user.id);
    return { message: 'User activated' };
  }

  @UseGuards(SuperAdminAccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({ status: 200, description: "Barcha adminlar ro'yxati." })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(AdminAccessTokenGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta adminni olish' })
  @ApiResponse({ status: 200, description: 'Admin topildi.' })
  @ApiResponse({ status: 404, description: 'Admin topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfGuard)
  @UseGuards(AdminAccessTokenGuard)
  @Patch(':id')
  @ApiOperation({ summary: "Admin ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: 'Admin yangilandi.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(SelfGuard)
  @UseGuards(AdminAccessTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 200, description: "Admin o'chirildi." })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
