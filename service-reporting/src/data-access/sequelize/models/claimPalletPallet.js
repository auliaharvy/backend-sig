'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClaimPalletPallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClaimPalletPallets.associate = function(models) {
        ClaimPalletPallets.belongsTo(models.Pallets, {foreignKey: 'mst_pallet_id'})
        ClaimPalletPallets.belongsTo(models.ClaimPallets, {foreignKey: 'trx_claim_pallet_id'})
      };
    }
  }
  ClaimPalletPallets.init({
    mst_pallet_id: DataTypes.INTEGER,
    trx_claim_pallet_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ClaimPalletPallets',
    tableName: 'trx_claim_pallet_mst_pallet',
  });
  ClaimPalletPallets.removeAttribute('id');
  ClaimPalletPallets.removeAttribute('createdAt');
  ClaimPalletPallets.removeAttribute('updatedAt');
  return ClaimPalletPallets;
};