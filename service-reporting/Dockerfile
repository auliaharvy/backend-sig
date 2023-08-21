FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install winston winston-daily-rotate-file

COPY . .

EXPOSE 8005

CMD ["npm", "start"]
