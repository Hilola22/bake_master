/*
  Warnings:

  - Made the column `courseId` on table `course_category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `course_category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `regionsId` on table `districts` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."PayMethod" AS ENUM ('CLICK', 'PAYME', 'CASH', 'CARD', 'TRANSFER');

-- CreateEnum
CREATE TYPE "public"."PayStatus" AS ENUM ('SUCCESSFUL', 'PENDING', 'CANCELLED', 'UNPAID');

-- CreateEnum
CREATE TYPE "public"."MoneyCurrency" AS ENUM ('UZS', 'USD', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."DiscountType" AS ENUM ('PERCENT', 'AMOUNT');

-- DropForeignKey
ALTER TABLE "public"."course_category" DROP CONSTRAINT "course_category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."course_category" DROP CONSTRAINT "course_category_courseId_fkey";

-- AlterTable
ALTER TABLE "public"."course_category" ALTER COLUMN "courseId" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."districts" ALTER COLUMN "regionsId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."certificates" (
    "id" SERIAL NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "certificate_url" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_fully_paid" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."course-contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "measurement" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "course-contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tips" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "tips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."equipments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "course_contents_id" INTEGER NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."completed_tasks" (
    "id" SERIAL NOT NULL,
    "instructor_feedback" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "course_contents_id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "completed_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task_images" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completedTasksId" INTEGER NOT NULL,

    CONSTRAINT "task_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."purchases" (
    "id" SERIAL NOT NULL,
    "amount_paid" DECIMAL(65,30) NOT NULL,
    "payment_status" "public"."PayStatus" NOT NULL DEFAULT 'UNPAID',
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "id" SERIAL NOT NULL,
    "payment_method" "public"."PayMethod" NOT NULL,
    "currency" "public"."MoneyCurrency" NOT NULL DEFAULT 'UZS',
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "public"."PayStatus" NOT NULL,
    "paid_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_expires" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coursesId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."promocodes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "discount_type" "public"."DiscountType" NOT NULL,
    "discount_value" DECIMAL(65,30) NOT NULL,
    "usage_limit" INTEGER NOT NULL,
    "used_count" INTEGER NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_to" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "promocodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refunds" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "amount" DECIMAL(65,30) NOT NULL,
    "refunded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refund_deadline" TIMESTAMP(3) NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."offline-lesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "is_full" BOOLEAN NOT NULL DEFAULT false,
    "instructorId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "districtsId" INTEGER NOT NULL,

    CONSTRAINT "offline-lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson-payment" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_method" "public"."PayMethod" NOT NULL,
    "paid_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discount_amount" DECIMAL(65,30) NOT NULL,
    "status" "public"."PayStatus" NOT NULL,
    "userId" INTEGER,
    "offlineLessonId" INTEGER,
    "promocodesId" INTEGER,

    CONSTRAINT "lesson-payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."course_category" ADD CONSTRAINT "course_category_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_category" ADD CONSTRAINT "course_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."certificates" ADD CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."certificates" ADD CONSTRAINT "certificates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course-contents" ADD CONSTRAINT "course-contents_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tips" ADD CONSTRAINT "tips_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."equipments" ADD CONSTRAINT "equipments_course_contents_id_fkey" FOREIGN KEY ("course_contents_id") REFERENCES "public"."course-contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."completed_tasks" ADD CONSTRAINT "completed_tasks_course_contents_id_fkey" FOREIGN KEY ("course_contents_id") REFERENCES "public"."course-contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."completed_tasks" ADD CONSTRAINT "completed_tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task_images" ADD CONSTRAINT "task_images_completedTasksId_fkey" FOREIGN KEY ("completedTasksId") REFERENCES "public"."completed_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promocodes" ADD CONSTRAINT "promocodes_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refunds" ADD CONSTRAINT "refunds_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offline-lesson" ADD CONSTRAINT "offline-lesson_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offline-lesson" ADD CONSTRAINT "offline-lesson_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offline-lesson" ADD CONSTRAINT "offline-lesson_districtsId_fkey" FOREIGN KEY ("districtsId") REFERENCES "public"."districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson-payment" ADD CONSTRAINT "lesson-payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson-payment" ADD CONSTRAINT "lesson-payment_offlineLessonId_fkey" FOREIGN KEY ("offlineLessonId") REFERENCES "public"."offline-lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson-payment" ADD CONSTRAINT "lesson-payment_promocodesId_fkey" FOREIGN KEY ("promocodesId") REFERENCES "public"."promocodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
