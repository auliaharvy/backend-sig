"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CompanyTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanyTypes.hasMany(models.Companies, {
        foreignKey: "id_company_type",
      });
    }
  }
  CompanyTypes.init(
    {
      name: DataTypes.STRING,
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "CompanyTypes",
      tableName: "mst_company_type",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return CompanyTypes;
};
