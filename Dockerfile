# Use a imagem base do Node.js
FROM node:20.9.0

# Cria o diretório de trabalho no container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

COPY tsconfig.json ./
# Instala as dependências da aplicação
RUN npm install

# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY src ./src
COPY prisma ./prisma
COPY .env ./

EXPOSE 3000

# Compila o código TypeScript para JavaScript
RUN npm run build
# Comando para iniciar a aplicação usando o script start
CMD ["npm", "start"]
