import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtSuperAdminStrategy extends PassportStrategy(
  Strategy,
  'superadmin-access-jwt',
  ) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SUPERADMIN_KEY!,
    });
  }

  async validate(payload: any) {
    console.log('SuperAdmin payload:', payload);
    if (payload.role !== 'SUPERADMIN') {
      throw new UnauthorizedException('Not superadmin');
    }
    return payload;
  }
}

