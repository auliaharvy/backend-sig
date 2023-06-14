FROM node:14-alpine

RUN apk add g++ make py3-pi

WORKDIR /app/reporting

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]