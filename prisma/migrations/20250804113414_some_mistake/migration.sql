/*
  Warnings:

  - You are about to drop the column `regionsId` on the `districts` table. All the data in the column will be lost.
  - Added the required column `regionId` to the `districts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."districts" DROP CONSTRAINT "districts_regionsId_fkey";

-- AlterTable
ALTER TABLE "public"."districts" DROP COLUMN "regionsId",
ADD COLUMN     "regionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."districts" ADD CONSTRAINT "districts_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
