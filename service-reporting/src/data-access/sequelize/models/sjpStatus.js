'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SjpStatuss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SjpStatuss.belongsTo(models.Sjps, { foreignKey: 'id_sjp', as: 'sjp' });
      SjpStatuss.belongsTo(models.Users, {
        foreignKey: "id_user_sender",
        as: "user_sender",
      });
      SjpStatuss.belongsTo(models.Users, {
        foreignKey: "id_user_receiver",
        as: "user_receiver",
      });
      SjpStatuss.belongsToMany(models.Pallets, {
        through: "SjpStatusPallet",
        foreignKey: "trx_sjp_status_id",
        as: "pallets"
      });
      SjpStatuss.hasMany(models.SjpStatusPallet, {
        foreignKey: "trx_sjp_status_id",
      });
    }
  }
  SjpStatuss.init({
    id_sjp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_receiver: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    trx_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sending_driver_approval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiving_driver_approval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_sendback: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // created_by: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // updated_by: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },
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
    },
  }, {
    sequelize,
    modelName: 'SjpStatuss',
    tableName: 'trx_sjp_status',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return SjpStatuss;
};