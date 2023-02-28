-- CreateTable
CREATE TABLE "Permmision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_UserPermissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserPermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "Permmision" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserPermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ItemToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ItemToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ItemToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATETIME,
    "priority" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "projectId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("body", "completed", "createdAt", "dueDate", "id", "priority", "title", "updatedAt", "userId") SELECT "body", "completed", "createdAt", "dueDate", "id", "priority", "title", "updatedAt", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "task_title" ON "Task"("title", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "permission_name" ON "Permmision"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPermissions_AB_unique" ON "_UserPermissions"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPermissions_B_index" ON "_UserPermissions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToProject_AB_unique" ON "_ItemToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToProject_B_index" ON "_ItemToProject"("B");
