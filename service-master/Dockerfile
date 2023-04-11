FROM node:14

WORKDIR /app/service-master

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]