-- Cria a extensão para UUID se não estiver disponível
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria a tabela UploadedMeasures
CREATE TABLE IF NOT EXISTS UploadedMeasures (
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT uuid_generate_v4(),
  type VARCHAR(255),
  value VARCHAR(255)
);

-- Cria a tabela ConfirmedMeasures
CREATE TABLE IF NOT EXISTS ConfirmedMeasures (
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT uuid_generate_v4(),
  firstValue VARCHAR(255),
  confirmedValue VARCHAR(255)
);
