FROM node:14-alpine

RUN apk add g++ make py3-pi

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]