FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g pm2

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist/ ./
COPY --from=build /usr/src/app/src/credentials/google_service_account.json ./src/credentials/

RUN npm install

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

RUN apk add --no-cache nginx

EXPOSE 80

CMD ["sh", "-c", "nginx && pm2-runtime app.js --name medpet-chatbot-service"]
