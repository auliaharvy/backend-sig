'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DamagedPallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DamagedPallets.init({
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_reporter: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trx_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qty_tbr_pallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'DamagedPallets',
    tableName: 'trx_damaged_pallet',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return DamagedPallets;
};