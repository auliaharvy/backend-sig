FROM node:14-alpine

RUN apk add g++ make py3-pip

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install winston winston-daily-rotate-file

COPY . .

EXPOSE 8002

CMD ["npm", "start"]
