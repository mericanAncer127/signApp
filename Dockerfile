FROM node:16-alpine as build

WORKDIR /usr/local/share/frontend

COPY package*.json ./
RUN apk --update add libtool automake autoconf nasm gcc make g++ zlib-dev
RUN npm install
COPY . .
RUN npm run build

FROM danjellz/http-server:1.2

ENV PORT=8080
EXPOSE 8080

COPY --from=build /usr/local/share/frontend/public .
