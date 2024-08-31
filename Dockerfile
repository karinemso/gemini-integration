# Use a imagem base do Node.js
FROM node:20.9.0

# Cria o diretório de trabalho no container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY src ./src
COPY prisma ./prisma
COPY .env ./
COPY init-db.sql ./

# Instala o cliente psql
RUN apt-get update && apt-get install -y postgresql-client

# Copia o arquivo de inicialização do banco de dados
COPY init-db.sh /docker-entrypoint-initdb.d/

# Define o comando padrão
CMD ["sh", "-c", "until pg_isready -h measures-db -p 5432; do sleep 2; done; npm start"]
