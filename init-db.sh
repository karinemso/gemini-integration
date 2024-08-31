#!/bin/bash
set -e

# Espera o PostgreSQL estar pronto
until pg_isready -h measures-db -p 5432; do
  echo "Aguardando o banco de dados estar pronto..."
  sleep 2
done

# Executa o script SQL para inicializar o banco de dados
psql -h measures-db -U admin -d measures -f /app/init-db.sql

echo "Banco de dados inicializado com sucesso."

