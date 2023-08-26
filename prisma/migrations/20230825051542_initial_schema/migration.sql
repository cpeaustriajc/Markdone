-- CreateTable
CREATE TABLE "Drafts" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL DEFAULT 'Untitled',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drafts_pkey" PRIMARY KEY ("id")
);
