import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class InstructorRefreshTokenGuard extends AuthGuard("instructor-refresh-jwt") {
  constructor() {
    super();
  }
}
