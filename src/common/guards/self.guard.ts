// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class SelfGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const req = context.switchToHttp().getRequest();
//     console.log(req.user);
//     if (req.user.id != req.params.id) {
//       throw new ForbiddenException({
//         message: 'Ruxsat etilmagan user',
//       });
//     }
//     return true;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext, 
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const loggedInUserId = request.user.id;

    const userIdFromParams = +request.params.id;

    if (loggedInUserId !== userIdFromParams) {
      throw new ForbiddenException({
        message: 'You are only allowed to access your own resources!',
      });
    }

    return true;
  }
}