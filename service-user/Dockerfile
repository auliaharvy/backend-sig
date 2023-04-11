FROM node:14

WORKDIR /app/service-user

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]