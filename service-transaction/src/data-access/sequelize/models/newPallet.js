'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewPallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewPallets.init({
    id_trx_change_quota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_workshop: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_request_pallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty_ready_pallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trx_number: DataTypes.STRING,
    status: DataTypes.INTEGER,
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
    modelName: 'NewPallets',
    tableName: 'trx_new_pallet',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return NewPallets;
};