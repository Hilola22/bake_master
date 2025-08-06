import { Module } from '@nestjs/common';
import { CompletedTasksService } from './completed_tasks.service';
import { CompletedTasksController } from './completed_tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInstructorStrategy } from '../common/strategies/instructor-access-token.strategy';
import { JwtInstructorAdminStrategy } from '../common/strategies/instructoradmin-access-token.strategy';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [CompletedTasksController],
  providers: [
    CompletedTasksService,
    JwtInstructorStrategy,
    JwtInstructorAdminStrategy,
    UserAccessTokenStrategy,
  ],
})
export class CompletedTasksModule {}
