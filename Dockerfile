FROM node:9.11

WORKDIR /app

COPY package.json .

RUN npm install --dev

COPY . .

RUN npm run build

RUN npm install