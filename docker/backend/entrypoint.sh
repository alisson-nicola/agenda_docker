#!/bin/sh

# Interrompe o script se algum comando falhar
set -e

echo "Aguardando PostgreSQL ficar disponível..."

# Loop simples até o banco responder conexão
python - <<'PY'
import os
import time
import psycopg

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT", "5432")

while True:
    try:
        psycopg.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
        ).close()
        print("PostgreSQL disponível.")
        break
    except Exception as exc:
        print(f"Banco ainda não disponível: {exc}")
        time.sleep(2)
PY

# Executa o comando principal do container
exec "$@"