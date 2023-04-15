FROM node:14-alpine

WORKDIR /app/service-master

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]