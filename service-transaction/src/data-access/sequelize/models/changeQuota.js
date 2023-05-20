'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChangeQuotas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChangeQuotas.init({
    id_company_requester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_requester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_approver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trx_number: DataTypes.STRING,
    status: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    approved_quantity: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    note: DataTypes.STRING,
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
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
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'ChangeQuotas',
    tableName: 'trx_change_quota',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return ChangeQuotas;
};