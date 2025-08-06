import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class InstructorOrInstructorAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return user?.role === 'INSTRUCTOR' || user?.role === 'INSTRUCTOR_ADMIN';
  }
}
