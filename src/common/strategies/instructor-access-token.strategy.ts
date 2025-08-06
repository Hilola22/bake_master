import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtInstructorStrategy extends PassportStrategy(
  Strategy,
  'instructor-access-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_INSTRUCTOR_KEY!,
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'INSTRUCTOR') {
      throw new UnauthorizedException('Not instructor');
    }
    return payload;
  }
}
