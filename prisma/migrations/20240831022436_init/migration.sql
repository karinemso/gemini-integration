-- CreateTable
CREATE TABLE "UploadedMeasures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ConfirmedMeasures" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "firstValue" TEXT NOT NULL,
    "confirmedValue" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadedMeasures_uuid_key" ON "UploadedMeasures"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmedMeasures_uuid_key" ON "ConfirmedMeasures"("uuid");
