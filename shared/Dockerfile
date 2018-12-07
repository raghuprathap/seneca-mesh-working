FROM node:8

RUN apt-get update
RUN apt-get install -y net-tools
WORKDIR /usr/src/app
COPY package.json .

RUN npm install

COPY . .