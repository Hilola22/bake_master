import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';
import { AdminAccessTokenStrategy } from '../common/strategies/admin-access-token.strategy';
import { RefrershTokenCookieStrategyAdmin } from '../common/strategies/refresh-token-cookie-admin.strategy';
import { RefrershTokenCookieStrategyUser } from '../common/strategies/refresh-token-cookie.strategy';
import { MailModule } from '../mail/mail.module';
import { AdminOrSuperadminAccessTokenStrategy } from '../common/strategies/admin-or-superadmin.strategy';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AdminModule,
    JwtModule.register({}),
    MailModule,
  ],
  providers: [
    AuthService,
    UserAccessTokenStrategy,
    AdminAccessTokenStrategy,
    RefrershTokenCookieStrategyAdmin,
    RefrershTokenCookieStrategyUser,
    AdminOrSuperadminAccessTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
