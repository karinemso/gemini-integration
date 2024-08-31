-- Create the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the UploadedMeasures table
CREATE TABLE "UploadedMeasures" (
  "id" SERIAL PRIMARY KEY,
  "uuid" UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  "type" VARCHAR(255) NOT NULL,
  "value" VARCHAR(255) NOT NULL
);

-- Create the ConfirmedMeasures table
CREATE TABLE "ConfirmedMeasures" (
  "id" SERIAL PRIMARY KEY,
  "uuid" UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  "firstValue" VARCHAR(255) NOT NULL,
  "confirmedValue" VARCHAR(255) NOT NULL
);