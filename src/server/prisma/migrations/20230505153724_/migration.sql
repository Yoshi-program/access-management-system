/*
  Warnings:

  - You are about to drop the column `discordId` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discordGuildId]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordChannelId]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordChannelId` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "organizations_discordId_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "discordId",
ADD COLUMN     "discordChannelId" TEXT ,
ADD COLUMN     "discordGuildId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_discordGuildId_key" ON "organizations"("discordGuildId");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_discordChannelId_key" ON "organizations"("discordChannelId");
