'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PalletTransfers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PalletTransfers.associate = function(models) {
        PalletTransfers.belongsTo(models.Companies, {foreignKey: 'id_company_departure', as: 'departure_company'})
        PalletTransfers.belongsTo(models.Companies, {foreignKey: 'id_company_destination', as: 'destination_company'})
        PalletTransfers.belongsTo(models.Companies, {foreignKey: 'id_company_transporter', as: 'transporter_company'})
      };
    }
  }
  PalletTransfers.init({
    id_company_departure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_destination: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company_transporter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_truck: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_driver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_checker_sender: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user_approver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_user_checker_receiver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    second_driver: DataTypes.STRING,
    trx_code: DataTypes.STRING,
    status: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    note: DataTypes.STRING,
    createdBy: {
      field: 'created_by',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      field: 'updated_by',
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
    modelName: 'PalletTransfers',
    tableName: 'trx_pallet_transfer',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return PalletTransfers;
};