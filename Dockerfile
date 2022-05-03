FROM node:16

WORKDIR /zespolowka/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]
