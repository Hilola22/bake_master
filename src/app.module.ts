import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AdminModule,
    AuthModule,
    RegionModule,
    DistrictsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
