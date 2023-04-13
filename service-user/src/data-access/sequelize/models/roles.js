'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roles.init({
    name: DataTypes.STRING,
    // is_deleted: {
    //   type: DataTypes.INTEGER,
    //   DEFAULT: 0
    // }
  }, {
    sequelize,
    modelName: 'Roles',
    // tableName: 'roles',
    // timestamps: true,
    // paranoid: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  });
  return Roles;
};