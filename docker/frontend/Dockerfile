# Imagem base com Node
FROM node:22-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiamos apenas package files primeiro para aproveitar cache
COPY frontend/package*.json /app/

# Instala dependências do frontend
RUN npm install

# Copia o restante do projeto
COPY frontend /app

# Expõe a porta padrão do Vite
EXPOSE 5173

# Sobe o servidor de desenvolvimento do Vite acessível de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]