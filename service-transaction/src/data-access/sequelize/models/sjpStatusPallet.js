'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SjpStatusPallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SjpStatusPallet.init({
    mst_pallet_id: DataTypes.INTEGER,
    trx_sjp_status_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'SjpStatusPallet',
    tableName: 'trx_sjp_status_mst_pallet',
  });
  SjpStatusPallet.removeAttribute('id');
  SjpStatusPallet.removeAttribute('createdAt');
  SjpStatusPallet.removeAttribute('updatedAt');
  return SjpStatusPallet;
};