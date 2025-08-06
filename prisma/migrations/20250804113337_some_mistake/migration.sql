/*
  Warnings:

  - You are about to drop the column `regionId` on the `districts` table. All the data in the column will be lost.
  - Made the column `userId` on table `lesson-payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offlineLessonId` on table `lesson-payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `promocodesId` on table `lesson-payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."districts" DROP CONSTRAINT "districts_regionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson-payment" DROP CONSTRAINT "lesson-payment_offlineLessonId_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson-payment" DROP CONSTRAINT "lesson-payment_promocodesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson-payment" DROP CONSTRAINT "lesson-payment_userId_fkey";

-- AlterTable
ALTER TABLE "public"."districts" DROP COLUMN "regionId";

-- AlterTable
ALTER TABLE "public"."lesson-payment" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "offlineLessonId" SET NOT NULL,
ALTER COLUMN "promocodesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."districts" ADD CONSTRAINT "districts_regionsId_fkey" FOREIGN KEY ("regionsId") REFERENCES "public"."region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson-payment" ADD CONSTRAINT "lesson-payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson-payment" ADD CONSTRAINT "lesson-payment_offlineLessonId_fkey" FOREIGN KEY ("offlineLessonId") REFERENCES "public"."offline-lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson-payment" ADD CONSTRAINT "lesson-payment_promocodesId_fkey" FOREIGN KEY ("promocodesId") REFERENCES "public"."promocodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
