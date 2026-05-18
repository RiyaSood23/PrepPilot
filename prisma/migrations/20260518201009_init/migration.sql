-- CreateTable
CREATE TABLE "PlacementStats" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "totalApplied" INTEGER NOT NULL DEFAULT 0,
    "totalSelected" INTEGER NOT NULL DEFAULT 0,
    "averageCgpa" DOUBLE PRECISION,
    "reportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlacementStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyReport" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "totalApplications" INTEGER NOT NULL DEFAULT 0,
    "selectedCount" INTEGER NOT NULL DEFAULT 0,
    "rejectedCount" INTEGER NOT NULL DEFAULT 0,
    "reportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlacementStats_companyName_reportDate_idx" ON "PlacementStats"("companyName", "reportDate");

-- CreateIndex
CREATE INDEX "CompanyReport_companyId_reportDate_idx" ON "CompanyReport"("companyId", "reportDate");
