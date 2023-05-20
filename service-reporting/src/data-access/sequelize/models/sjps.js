"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sjps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sjps.belongsTo(models.Companies, {
        foreignKey: "id_departure_company",
        as: "departure_company",
      });
      Sjps.belongsTo(models.Companies, {
        foreignKey: "id_destination_company",
        as: "destination_company",
      });
      Sjps.belongsTo(models.Companies, {
        foreignKey: "id_transporter_company",
        as: "transporter_company",
      });
      Sjps.belongsTo(models.Trucks, { foreignKey: "id_truck", as: "truck" });
      Sjps.belongsTo(models.Drivers, { foreignKey: "id_driver", as: "driver" });
      // Asosiasi dengan TrxSjpStatus
      Sjps.hasOne(models.SjpStatuss, { foreignKey: 'id_sjp', as: 'status' });
    }
  }
  Sjps.init(
    {
      id_departure_company: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_destination_company: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tonnage: DataTypes.INTEGER,
      packaging: DataTypes.INTEGER,
      product_quantity: DataTypes.INTEGER,
      pallet_quantity: DataTypes.INTEGER,
      eta: DataTypes.DATEONLY,
      departure_time: DataTypes.DATEONLY,
      trx_status: {
        field: "trx_status",
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      distribution: {
        field: "distribution",
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdBy: {
        field: "created_by",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: {
        field: "updated_by",
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
      },
    },
    {
      sequelize,
      modelName: "Sjps",
      tableName: "trx_sjp",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Sjps;
};
