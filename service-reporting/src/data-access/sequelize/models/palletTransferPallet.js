'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PalletTransferPallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PalletTransferPallet.associate = function(models) {
        PalletTransferPallet.belongsTo(models.Pallets, {foreignKey: 'mst_pallet_id'})
        PalletTransferPallet.belongsTo(models.PalletTransfers, {foreignKey: 'trx_pallet_transfer_id'})
      };
    }
  }
  PalletTransferPallet.init({
    mst_pallet_id: DataTypes.INTEGER,
    trx_pallet_transfer_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'PalletTransferPallet',
    tableName: 'trx_pallet_transfer_mst_pallet',
  });
  PalletTransferPallet.removeAttribute('id');
  PalletTransferPallet.removeAttribute('createdAt');
  PalletTransferPallet.removeAttribute('updatedAt');
  return PalletTransferPallet;
};