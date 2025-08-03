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
import { CoursesModule } from './courses/courses.module';
import { CourseCategoryModule } from './course-category/course-category.module';
import { CertificstesModule } from './certificstes/certificstes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CourseContentsModule } from './course-contents/course-contents.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { CompletedTasksModule } from './completed_tasks/completed_tasks.module';
import { TaskImagesModule } from './task_images/task_images.module';
import { PurchasesModule } from './purchases/purchases.module';
import { PaymentModule } from './payment/payment.module';
import { PromocodesModule } from './promocodes/promocodes.module';
import { RefundsModule } from './refunds/refunds.module';
import { OfflineLessonModule } from './offline-lesson/offline-lesson.module';
import { LessonPaymentModule } from './lesson-payment/lesson-payment.module';

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
    CoursesModule,
    CourseCategoryModule,
    CertificstesModule,
    ReviewsModule,
    CourseContentsModule,
    EquipmentsModule,
    CompletedTasksModule,
    TaskImagesModule,
    PurchasesModule,
    PaymentModule,
    PromocodesModule,
    RefundsModule,
    OfflineLessonModule,
    LessonPaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
