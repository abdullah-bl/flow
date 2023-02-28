-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "started" DATETIME,
    "ended" DATETIME,
    "reference" TEXT DEFAULT '',
    "number" TEXT DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createdAt", "description", "ended", "id", "name", "number", "reference", "started", "updatedAt", "userId") SELECT "createdAt", "description", "ended", "id", "name", "number", "reference", "started", "updatedAt", "userId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE INDEX "item_name" ON "Item"("name", "userId", "reference", "number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
