import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AdminAccessTokenGuard, SelfGuard, SuperAdminAccessTokenGuard, UserAccessTokenGuard } from '../common/guards';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi muvaffaqiyatli yaratildi.',
  })
  @ApiResponse({ status: 400, description: 'Yaratishda xatolik yuz berdi.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('activate/:code')
  async activate(@Param('code') code: string) {
    const user = await this.usersService.findUserByActivationLink(code);
    if (!user) {
      throw new NotFoundException('Activation code not found');
    }

    await this.usersService.activateUser(user.id);
    return { message: 'User activated' };
  }
  @UseGuards(AdminAccessTokenGuard)
  @ApiBearerAuth('token')
  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar ro'yxati." })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('top-buyers')
  getTopBuyers() {
    return this.usersService.getTopBuyers();
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali foydalanuvchini olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi.' })
  @ApiResponse({ status: 404, description: 'Yangilanishda xatolik yuz berdi.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o'chirildi." })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
