FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install winston

RUN npm install winston-daily-rotate-file

COPY . .

EXPOSE 3000

CMD ["npm", "start"]