/*
  Warnings:

  - Made the column `discordChannelId` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "discordChannelId" SET NOT NULL;
