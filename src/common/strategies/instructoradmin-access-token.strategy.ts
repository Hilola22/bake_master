import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtInstructorAdminStrategy extends PassportStrategy(
  Strategy,
  'instructoradmin-access-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_INSTRUCTOR_ADMIN_KEY!,
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'INSTRUCTOR_ADMIN') {
      throw new UnauthorizedException('Not superadmin');
    }
    return payload;
  }
}
