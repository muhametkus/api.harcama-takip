-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'CASH');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CASH', 'SAVING', 'BANK');

-- CreateTable
CREATE TABLE "cards" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "limit" DECIMAL(12,2) NOT NULL,
    "currentDebt" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "statementDate" INTEGER NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" UUID NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "cardId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cardId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" UUID NOT NULL,
    "type" "AssetType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "expenses_date_idx" ON "expenses"("date");

-- CreateIndex
CREATE INDEX "expenses_category_idx" ON "expenses"("category");

-- CreateIndex
CREATE INDEX "expenses_cardId_idx" ON "expenses"("cardId");

-- CreateIndex
CREATE INDEX "payments_date_idx" ON "payments"("date");

-- CreateIndex
CREATE INDEX "payments_cardId_idx" ON "payments"("cardId");

-- CreateIndex
CREATE INDEX "assets_type_idx" ON "assets"("type");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

