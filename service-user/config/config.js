require('dotenv').config();

const {
  DB_HOSTNAME,
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME
 } = process.env
module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "logConfig": {
    "logFolder": ".//logs//",
    "logFile": "pms-service-user-%DATE%.log"
  },
  "logLevels": {
      "error": 0,
      "warn": 1,
      "info": 2,
      "http": 3,
      "verbose": 4,
      "debug": 5,
      "silly": 6
  }
}
