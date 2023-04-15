'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Companies.init({
    name: DataTypes.STRING,
    is_deleted: {
      type: DataTypes.INTEGER,
      DEFAULT: 0
    },
    idOrganization: {
      field: 'id_organization',
      type: DataTypes.INTEGER,
    },
    idCompanyType: {
      field: 'id_company_type',
      type: DataTypes.INTEGER,
    },
    code: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    tag: DataTypes.STRING,
    createdBy: {
      field: 'created_by',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      field: 'updated_by',
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Companies',
    tableName: 'mst_companies',
    // timestamps: true,
    // paranoid: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  });
  return Companies;
};