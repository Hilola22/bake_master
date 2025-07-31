import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable()
export class DistrictsService {
  constructor(private prisma: PrismaService) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const region = await this.prisma.region.findUnique({
      where: { id: createDistrictDto.regionId },
    });
    if (!region) {
      throw new NotFoundException("Bunday region mavjud emas!");
    }
    return this.prisma.districts.create({
      data: {
        name: createDistrictDto.name,
        regionId: createDistrictDto.regionId,
      },
    });
  }

  async findAll() {
    return this.prisma.districts.findMany({
      include: {
        region: true,
      },
    });
  }

  async findOne(id: number) {
    const district = await this.prisma.districts.findUnique({
      where: { id },
      include: { region: true },
    });

    if (!district) {
      throw new NotFoundException("District topilmadi!");
    }

    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.prisma.districts.findUnique({ where: { id } });
    if (!district) {
      throw new NotFoundException("Bunday district mavjud emas!");
    }

    return this.prisma.districts.update({
      where: { id },
      data: updateDistrictDto,
    });
  }

  async remove(id: number) {
    const district = await this.prisma.districts.findUnique({ where: { id } });
    if (!district) {
      throw new NotFoundException("O'chirish uchun district topilmadi!");
    }

    await this.prisma.districts.delete({ where: { id } });
    return { message: "District o'chirildi!" };
  }
}
