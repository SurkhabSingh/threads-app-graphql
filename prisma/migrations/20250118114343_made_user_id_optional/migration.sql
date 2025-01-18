-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_user_id_fkey";

-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
