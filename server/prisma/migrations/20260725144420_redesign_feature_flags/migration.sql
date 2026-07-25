/*
  Warnings:

  - You are about to drop the column `enabled` on the `FeatureFlag` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `FeatureFlag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeatureFlag" DROP CONSTRAINT "FeatureFlag_organizationId_fkey";

-- AlterTable
ALTER TABLE "FeatureFlag" DROP COLUMN "enabled",
DROP COLUMN "organizationId";

-- CreateTable
CREATE TABLE "OrganizationFeature" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationFeature_organizationId_featureId_key" ON "OrganizationFeature"("organizationId", "featureId");

-- AddForeignKey
ALTER TABLE "OrganizationFeature" ADD CONSTRAINT "OrganizationFeature_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationFeature" ADD CONSTRAINT "OrganizationFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "FeatureFlag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
