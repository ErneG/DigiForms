FROM node:20.11.1-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./


ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL}


RUN npm install 

COPY . .

RUN npm run build

CMD [ "npm","start" ]
