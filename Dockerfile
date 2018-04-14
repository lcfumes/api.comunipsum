FROM node:9.11

WORKDIR /app

COPY package.json .

COPY . .

RUN npm run build

EXPOSE 8000

RUN npm install --only=dev
