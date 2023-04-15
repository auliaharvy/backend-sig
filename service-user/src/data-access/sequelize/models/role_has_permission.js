'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleHasPermission.init({
    idRole: {
      field: 'id_role',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPermission: {
      field: 'id_permission',
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'RoleHasPermission',
    tableName: 'role_has_permission',
  });
  return RoleHasPermission;
};