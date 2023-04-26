'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHasRole.init({
    idUser: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idRole: {
      field: 'role_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCompany: {
      field: 'company_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UserHasRole',
    tableName: 'user_has_role',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });
  UserHasRole.removeAttribute('id');
  return UserHasRole;
};