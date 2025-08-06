import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';
import { AdminAccessTokenStrategy } from '../common/strategies/admin-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, UserAccessTokenStrategy, AdminAccessTokenStrategy],
  exports: [UsersService],
})
export class UsersModule {}
