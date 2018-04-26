FROM node:8-slim

EXPOSE 3000

ENV HOME=/home/web
ENV PORT=3000

RUN apt-get update -y

RUN mkdir -p /api

WORKDIR /api

COPY package.json package-lock.json /api/

RUN npm install --silent --progress=false

COPY . .

CMD npm run start:prod

