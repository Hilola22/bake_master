-- CreateTable
CREATE TABLE "public"."course_category" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "course_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."course_category" ADD CONSTRAINT "course_category_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_category" ADD CONSTRAINT "course_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
