/*
  Warnings:

  - You are about to drop the column `categoryId` on the `course_category` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `course_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."course_category" DROP CONSTRAINT "course_category_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."certificates" ALTER COLUMN "issued_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."course_category" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."category";
