'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// company have pallet
db.companies = require("./companies")(sequelize, Sequelize);
db.mstPallet = require("./pallets")(sequelize, Sequelize);

db.companies.belongsToMany(db.mstPallet, {
  through: "mst_pallet_mst_companies",
  as: "mst_companies",
  foreignKey: "mst_companies_id",
});
db.mstPallet.belongsToMany(db.companies, {
  through: "mst_pallet_mst_companies",
  as: "mst_pallet",
  foreignKey: "mst_pallet_id",
});

module.exports = db;
