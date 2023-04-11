FROM node:14

WORKDIR /app/service-notification

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]