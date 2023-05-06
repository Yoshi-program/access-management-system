/*
  Warnings:

  - A unique constraint covering the columns `[userId,organizationId]` on the table `users_organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_organizations_userId_organizationId_key" ON "users_organizations"("userId", "organizationId");
