import { Module } from '@nestjs/common';
import { TaskImagesService } from './task_images.service';
import { TaskImagesController } from './task_images.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [TaskImagesController],
  providers: [TaskImagesService, UserAccessTokenStrategy],
})
export class TaskImagesModule {}
