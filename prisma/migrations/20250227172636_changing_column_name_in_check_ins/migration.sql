/*
  Warnings:

  - You are about to drop the column `crated_at` on the `check-ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check-ins" DROP COLUMN "crated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
