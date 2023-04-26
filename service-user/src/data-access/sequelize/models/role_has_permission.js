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
    id_role: DataTypes.INTEGER,
    id_permission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleHasPermission',
    tableName: 'role_has_permission',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  RoleHasPermission.removeAttribute("id");
  return RoleHasPermission;
};