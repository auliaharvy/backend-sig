# sig-microbackend

#HOW TO INSTALL


```bash

# Copy env.example to .env

# Clone the project and run npm
cd api-gateway
npm install

# RUN develop
npm run dev

cd service-user
npm install

# RUN develop
npm run dev

cd crud-clean
npm install

# RUN develop
npm run dev

# Migration and DB seeder (after changing your DB settings in .env)
npx sequelize-cli db:migrate



# Build on production
npm run production
```


