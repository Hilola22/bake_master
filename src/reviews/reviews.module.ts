import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserAccessTokenStrategy } from '../common/strategies/user-access-token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [ReviewsController],
  providers: [ReviewsService, UserAccessTokenStrategy],
})
export class ReviewsModule {}
