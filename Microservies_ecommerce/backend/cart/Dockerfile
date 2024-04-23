FROM node:18

WORKDIR /usr/src/cart-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "node", "app.js" ]
