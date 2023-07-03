'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sjps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sjps.associate = function(models) {
        Sjps.belongsTo(models.Companies, {foreignKey: 'id_departure_company', as: 'departure_company'})
        Sjps.belongsTo(models.Companies, {foreignKey: 'id_destination_company', as: 'destination_company'})
        Sjps.belongsTo(models.Companies, {foreignKey: 'id_transporter_company', as: 'transporter_company'})
      };
    }
  }
  Sjps.init({
    id_departure_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_destination_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_multiple: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    id_transporter_company: {
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
    second_driver: DataTypes.STRING,
    trx_number: DataTypes.STRING,
    no_do: DataTypes.STRING,
    tonnage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    packaging: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pallet_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    eta: DataTypes.DATEONLY,
    departure_time: DataTypes.DATEONLY,
    trx_status: {
      field: 'trx_status',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    distribution: {
      field: 'distribution',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
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
    modelName: 'Sjps',
    tableName: 'trx_sjp',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Sjps;
};