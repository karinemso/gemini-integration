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

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expõe a porta em que a aplicação irá rodar (substitua pelo número da porta que sua aplicação usa)
EXPOSE 3000

# Comando para iniciar a aplicação usando o script start
CMD ["npm", "start"]
