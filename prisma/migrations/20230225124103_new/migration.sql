/*
  Warnings:

  - You are about to drop the `_BudgetToProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_BudgetToProject_B_index";

-- DropIndex
DROP INDEX "_BudgetToProject_AB_unique";

-- DropIndex
DROP INDEX "_ItemToProject_B_index";

-- DropIndex
DROP INDEX "_ItemToProject_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BudgetToProject";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItemToProject";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL DEFAULT 0,
    "started" DATETIME,
    "ended" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "budgetId" TEXT,
    "itemId" TEXT,
    "userId" TEXT NOT NULL,
    "phaseId" TEXT,
    CONSTRAINT "Project_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Project_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Project_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "ProjectPhase" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("cost", "createdAt", "description", "ended", "id", "name", "phaseId", "started", "updatedAt", "userId") SELECT "cost", "createdAt", "description", "ended", "id", "name", "phaseId", "started", "updatedAt", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE INDEX "project_name" ON "Project"("name", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
