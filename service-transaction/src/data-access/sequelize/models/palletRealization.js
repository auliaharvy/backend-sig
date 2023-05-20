'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PalletRealizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PalletRealizations.init({
    id_trx_new_pallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_pallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trx_number: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'PalletRealizations',
    tableName: 'trx_new_pallet_realisation',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return PalletRealizations;
};