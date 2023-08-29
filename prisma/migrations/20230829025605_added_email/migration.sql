/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Drafts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Drafts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drafts" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Drafts_email_key" ON "Drafts"("email");
