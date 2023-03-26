'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drivers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drivers.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sim: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Drivers',
  });
  return Drivers;
};