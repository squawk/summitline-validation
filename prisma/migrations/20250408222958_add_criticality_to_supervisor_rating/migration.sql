/*
  Warnings:

  - Added the required column `criticality` to the `SupervisorRating` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SupervisorRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "criticality" INTEGER NOT NULL,
    "current_level" INTEGER NOT NULL,
    "expected_level" INTEGER NOT NULL,
    "development_needed" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "SupervisorRating_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SupervisorRating_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SupervisorRating" ("assessment_id", "comments", "competency_id", "current_level", "development_needed", "expected_level", "id", "criticality") SELECT "assessment_id", "comments", "competency_id", "current_level", "development_needed", "expected_level", "id", 3 FROM "SupervisorRating";
DROP TABLE "SupervisorRating";
ALTER TABLE "new_SupervisorRating" RENAME TO "SupervisorRating";
CREATE UNIQUE INDEX "SupervisorRating_assessment_id_competency_id_key" ON "SupervisorRating"("assessment_id", "competency_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
