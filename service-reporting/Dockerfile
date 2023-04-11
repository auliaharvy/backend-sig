FROM node

WORKDIR /app/reporting

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]