import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const allowedRoles =
  //     this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || [];
  //   const req = context.switchToHttp().getRequest();
  //   const userRoles = req.user?.role || [];

  //   if (
  //     !Array.isArray(userRoles) ||
  //     !userRoles.some((role: any) => allowedRoles.includes(role))
  //   ) {
  //     throw new ForbiddenException('You do not have the required role');
  //   }

  //   return true;
  // }
  canActivate(context: ExecutionContext): boolean {
    const allowedRoles =
      this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || [];

    const req = context.switchToHttp().getRequest();
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}
