-- CreateTable
CREATE TABLE "Competency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CompetencyLevel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competency_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "CompetencyLevel_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Behavior" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competency_level_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Behavior_competency_level_id_fkey" FOREIGN KEY ("competency_level_id") REFERENCES "CompetencyLevel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "completed_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Assessment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AssessmentRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "criticality" INTEGER NOT NULL,
    "current_level" INTEGER NOT NULL,
    "expected_level" INTEGER NOT NULL,
    "development_needed" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "AssessmentRating_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssessmentRating_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SupervisorRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "current_level" INTEGER NOT NULL,
    "expected_level" INTEGER NOT NULL,
    "development_needed" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "SupervisorRating_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SupervisorRating_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentRating_assessment_id_competency_id_key" ON "AssessmentRating"("assessment_id", "competency_id");

-- CreateIndex
CREATE UNIQUE INDEX "SupervisorRating_assessment_id_competency_id_key" ON "SupervisorRating"("assessment_id", "competency_id");
