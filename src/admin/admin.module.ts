import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtSuperAdminStrategy } from '../common/strategies/superadmin-access-token.strategy';
import { AdminAccessTokenGuard } from '../common/guards';
import { AdminAccessTokenStrategy } from '../common/strategies/admin-access-token.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [AdminController],
  providers: [AdminService, JwtSuperAdminStrategy, AdminAccessTokenStrategy],
  exports: [AdminService],
})
export class AdminModule {}
