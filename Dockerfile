FROM node:9.11

WORKDIR /app

COPY package.json .
RUN npm install --quiet

COPY . .

RUN npm install

CMD [ "node" ]