import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminOrSuperadminAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'admin-superamdin-access-jwt',
) {
    constructor(private prismaService: PrismaService) {
      const secret = process.env.REFRESH_TOKEN_SECRET;
      if (!secret) {
        throw new Error('REFRESH_TOKEN_SECRET is not set in .env');
      }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET!,
    });
  }

  async validate(payload: any) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id: payload.id },
    });

    if (!admin) throw new UnauthorizedException();

    if (admin.is_creator === true || admin.is_creator === false) {
      return admin;
    }

    throw new UnauthorizedException();
  }
}
