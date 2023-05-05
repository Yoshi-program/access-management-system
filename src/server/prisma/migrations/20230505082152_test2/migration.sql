/*
  Warnings:

  - You are about to drop the column `post_created_at` on the `accessLog` table. All the data in the column will be lost.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accessLog" DROP COLUMN "post_created_at",
ADD COLUMN     "accessLog_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "allow" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL;
