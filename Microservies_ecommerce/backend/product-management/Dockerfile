FROM node:18

WORKDIR /usr/src/product-service

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3002

CMD [ "node", "app.js" ]
