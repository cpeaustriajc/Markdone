/*
  Warnings:

  - You are about to drop the column `email` on the `Drafts` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Drafts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Drafts_email_key";

-- AlterTable
ALTER TABLE "Drafts" RENAME COLUMN "email" TO "owner";
