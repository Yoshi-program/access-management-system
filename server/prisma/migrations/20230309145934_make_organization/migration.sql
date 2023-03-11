/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- DropTable
DROP TABLE "post";

-- CreateTable
CREATE TABLE "accessLog" (
    "id" SERIAL NOT NULL,
    "post_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "floorId" INTEGER NOT NULL,
    "userId" TEXT,
    "access" TEXT NOT NULL,

    CONSTRAINT "accessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "organizationId" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "discordId" TEXT,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_organizations" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "users_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organizationId_key" ON "organizations"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organizationName_key" ON "organizations"("organizationName");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_discordId_key" ON "organizations"("discordId");

-- AddForeignKey
ALTER TABLE "accessLog" ADD CONSTRAINT "accessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_organizations" ADD CONSTRAINT "users_organizations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organizationId") ON DELETE SET NULL ON UPDATE CASCADE;
