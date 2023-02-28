-- DropIndex
DROP INDEX "item_name";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN "number" TEXT;
ALTER TABLE "Item" ADD COLUMN "reference" TEXT;

-- CreateIndex
CREATE INDEX "item_name" ON "Item"("name", "userId", "reference", "number");
