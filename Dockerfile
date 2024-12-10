FROM node:22-alpine

RUN apk update
RUN apk add python3 make g++
RUN apk add --update nodejs npm

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

ENTRYPOINT [ "sh", "docker/entrypoint.sh" ]