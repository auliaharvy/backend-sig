'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organizations.init({
    name: DataTypes.STRING,
    is_deleted: {
      type: DataTypes.INTEGER,
      DEFAULT: 0
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
    modelName: 'Organizations',
    tableName: 'mst_organization',
    // timestamps: true,
    // paranoid: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  });
  return Organizations;
};