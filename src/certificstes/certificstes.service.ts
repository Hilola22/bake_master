import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCertificsteDto } from './dto/create-certificste.dto';
import { UpdateCertificsteDto } from './dto/update-certificste.dto';

@Injectable()
export class CertificstesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCertificsteDto: CreateCertificsteDto) {
    return this.prisma.certificates.create({
      data: createCertificsteDto,
    });
  }

  async findAll() {
    return this.prisma.certificates.findMany({
      include: {
        user: true,
        courses: true,
      },
    });
  }

  async findOne(id: number) {
    const certificate = await this.prisma.certificates.findUnique({
      where: { id },
      include: {
        user: true,
        courses: true,
      },
    });

    if (!certificate) {
      throw new NotFoundException(`Sertifikat topilmadi: ID ${id}`);
    }

    return certificate;
  }

  async update(id: number, updateCertificsteDto: UpdateCertificsteDto) {
    await this.findOne(id);

    return this.prisma.certificates.update({
      where: { id },
      data: updateCertificsteDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 

    return this.prisma.certificates.delete({
      where: { id },
    });
  }
}
