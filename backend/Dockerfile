
FROM python:3.11-alpine3.17

WORKDIR /app

COPY ../backend /app/

RUN pip install -r /app/packages.txt 

RUN chmod +x /app/wait-for-it.sh


