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
    id_permission: DataTypes.INTEGER,
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
    modelName: 'RoleHasPermission',
    tableName: 'role_has_permission',
  });
  RoleHasPermission.removeAttribute('id');
  return RoleHasPermission;
};