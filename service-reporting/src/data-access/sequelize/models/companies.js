"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Companies.hasMany(models.Sjps, {
        foreignKey: "id_departure_company",
        as: "departure_sjps",
      });
      Companies.hasMany(models.Sjps, {
        foreignKey: "id_destination_company",
        as: "destination_sjps",
      });
      Companies.hasMany(models.Sjps, {
        foreignKey: "id_transporter_company",
        as: "transporter_sjps",
      });
      Companies.belongsTo(models.Organizations, {
        foreignKey: "id_organization",
        as: "organization",
      });
      Companies.belongsToMany(models.Pallets, {
        through: "CompaniesPallet",
        foreignKey: "mst_companies_id",
        as: "pallets",
      });
    }
  }
  Companies.init(
    {
      name: DataTypes.STRING,
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      id_organization: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_company_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: DataTypes.STRING,
      address: DataTypes.STRING,
      address: DataTypes.STRING,
      pallet_quota: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      tag: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "Companies",
      tableName: "mst_companies",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Companies;
};
