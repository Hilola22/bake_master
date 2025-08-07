import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadAdmin } from "../types/jwt-payload-admin.type";

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

  async validate(req: Request, payload: JwtPayloadAdmin) {
    console.log('SuperAdmin payload:', payload);
    return payload;
  }
}

