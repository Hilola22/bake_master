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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CertificstesService } from './certificstes.service';
import { CreateCertificsteDto } from './dto/create-certificste.dto';
import { UpdateCertificsteDto } from './dto/update-certificste.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfGuard, UserAccessTokenGuard } from '../common/guards';
import { RoleGuard } from '../common/guards/role.guard';
import { InstructorAdminAccessTokenGuard } from '../common/guards/instructoradmin-access-token.guard';

@ApiTags('Sertifikatlar')
@Controller('certificstes')
export class CertificstesController {
  constructor(private readonly certificstesService: CertificstesService) {}

  @Roles('INSTRUCTOR_ADMIN')
  @ApiBearerAuth('token')
  @UseGuards(InstructorAdminAccessTokenGuard, RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi sertifikat yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Sertifikat muvaffaqiyatli yaratildi',
  })
  create(@Body() createCertificsteDto: CreateCertificsteDto) {
    return this.certificstesService.create(createCertificsteDto);
  }

  @Roles('INSTRUCTOR_ADMIN')
  @ApiBearerAuth('token')
  @UseGuards(InstructorAdminAccessTokenGuard, RoleGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha sertifikatlarni olish' })
  @ApiResponse({ status: 200, description: "Sertifikatlar ro'yxati" })
  findAll() {
    return this.certificstesService.findAll();
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha sertifikat olish" })
  @ApiResponse({ status: 200, description: 'Sertifikat topildi' })
  findOne(@Param('id') id: string) {
    return this.certificstesService.findOne(+id);
  }

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha sertifikatni yangilash" })
  @ApiResponse({ status: 200, description: 'Sertifikat yangilandi' })
  update(
    @Param('id') id: string,
    @Body() updateCertificsteDto: UpdateCertificsteDto,
  ) {
    return this.certificstesService.update(+id, updateCertificsteDto);
  }

  @UseGuards(InstructorAdminAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha sertifikatni o'chirish" })
  @ApiResponse({ status: 200, description: "Sertifikat o'chirildi" })
  remove(@Param('id') id: string) {
    return this.certificstesService.remove(+id);
  }
}
