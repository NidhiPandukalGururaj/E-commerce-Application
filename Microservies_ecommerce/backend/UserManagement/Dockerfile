FROM node:18

WORKDIR /usr/src/user-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "app.js" ]
