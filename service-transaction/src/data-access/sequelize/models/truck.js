'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trucks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trucks.init({
    id_company: DataTypes.INTEGER,
    license_plate: DataTypes.STRING,
    transporter_code: DataTypes.STRING,
    transporter_name: DataTypes.STRING,
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
    is_deleted: DataTypes.INTEGER,
  }, {
    sequelize,
    indexes: [{
      unique: true,
      fields: ['license_plate'] // you can use multiple columns as well here
    }],
    modelName: 'Trucks',
    tableName: 'mst_truck',
    // timestamps: true,
    // paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Trucks;
};