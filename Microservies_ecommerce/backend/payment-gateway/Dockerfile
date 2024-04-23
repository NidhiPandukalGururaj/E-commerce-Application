FROM node:18

WORKDIR /usr/src/payment-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD [ "node", "app.js" ]
