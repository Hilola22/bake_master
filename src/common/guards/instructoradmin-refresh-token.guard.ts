import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class InstructorAdminRefreshTokenGuard extends AuthGuard("instructoradmin-refresh-jwt") {
  constructor() {
    super();
  }
}
