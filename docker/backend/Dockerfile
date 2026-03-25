# Imagem base enxuta com Python
FROM python:3.12-slim

# Evita criar arquivos .pyc e melhora logs no terminal do container
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Define pasta de trabalho dentro do container
WORKDIR /app

# Instala dependências do sistema necessárias para compilar/liberar pacotes Python
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia primeiro o requirements para aproveitar cache de build
COPY backend/requirements.txt /app/requirements.txt

# Instala dependências Python
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

# Copia o script de entrada
COPY docker/backend/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

# Copia o projeto
COPY backend /app

# Expõe a porta interna do Django
EXPOSE 8000

# Usa o entrypoint para esperar o banco e depois executar o comando do serviço
ENTRYPOINT ["/entrypoint.sh"]