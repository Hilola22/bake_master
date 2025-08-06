import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class SuperAdminRefreshTokenGuard extends AuthGuard("superadmin-refresh-jwt") {
  constructor() {
    super();
  }
}
