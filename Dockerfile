# Imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o Express vai utilizar (altere se necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
