-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "body_thread" TEXT NOT NULL,
    "blog_image_url" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
