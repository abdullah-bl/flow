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
    "itemId" TEXT,
    "userId" TEXT NOT NULL,
    "phaseId" TEXT,
    "budgetId" TEXT,
    CONSTRAINT "Project_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Project_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "ProjectPhase" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Project_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("budgetId", "cost", "createdAt", "description", "ended", "id", "itemId", "name", "phaseId", "started", "updatedAt", "userId") SELECT "budgetId", "cost", "createdAt", "description", "ended", "id", "itemId", "name", "phaseId", "started", "updatedAt", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE INDEX "project_name" ON "Project"("name", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
