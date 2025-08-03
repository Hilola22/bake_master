import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificstesService } from './certificstes.service';
import { CreateCertificsteDto } from './dto/create-certificste.dto';
import { UpdateCertificsteDto } from './dto/update-certificste.dto';

@Controller('certificstes')
export class CertificstesController {
  constructor(private readonly certificstesService: CertificstesService) {}

  @Post()
  create(@Body() createCertificsteDto: CreateCertificsteDto) {
    return this.certificstesService.create(createCertificsteDto);
  }

  @Get()
  findAll() {
    return this.certificstesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificstesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificsteDto: UpdateCertificsteDto) {
    return this.certificstesService.update(+id, updateCertificsteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificstesService.remove(+id);
  }
}
