'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SewaPalletPallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SewaPalletPallets.associate = function(models) {
        SewaPalletPallets.belongsTo(models.Pallets, {foreignKey: 'mst_pallet_id'})
        SewaPalletPallets.belongsTo(models.SewaPallets, {foreignKey: 'trx_pengajuan_sewa_id'})
      };
    }
  }
  SewaPalletPallets.init({
    mst_pallet_id: DataTypes.INTEGER,
    trx_pengajuan_sewa_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'SewaPalletPallets',
    tableName: 'trx_pengajuan_sewa_mst_pallet',
  });
  SewaPalletPallets.removeAttribute('id');
  SewaPalletPallets.removeAttribute('createdAt');
  SewaPalletPallets.removeAttribute('updatedAt');
  return SewaPalletPallets;
};