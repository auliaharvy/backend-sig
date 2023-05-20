'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClaimPallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClaimPallets.init({
    id_company_distributor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_manager: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user_distributor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trx_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason_manager: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason_distributor: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'ClaimPallets',
    tableName: 'trx_claim_pallet',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return ClaimPallets;
};