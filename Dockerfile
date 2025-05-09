# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o container
COPY . .

# Expõe a porta correta usada no server.js
EXPOSE 3030

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]
