'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrxNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TrxNumbers.init({
    trx_type: DataTypes.STRING,
    code: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.STRING,
    increment_number: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TrxNumbers',
    tableName: 'mst_trx_number',
    timestamps: false,
  });
  return TrxNumbers;
};