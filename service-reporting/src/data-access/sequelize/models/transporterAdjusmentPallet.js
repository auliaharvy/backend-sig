'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransporterAdjusmentPallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransporterAdjusmentPallets.associate = function(models) {
        TransporterAdjusmentPallets.belongsTo(models.Pallets, {foreignKey: 'mst_pallet_id'})
        TransporterAdjusmentPallets.belongsTo(models.TransporterAdjusments, {foreignKey: 'trx_transporter_adjusment_id'})
      };
    }
  }
  TransporterAdjusmentPallets.init({
    mst_pallet_id: DataTypes.INTEGER,
    trx_transporter_adjusment_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'TransporterAdjusmentPallets',
    tableName: 'trx_transporter_adjusment_mst_pallet',
  });
  TransporterAdjusmentPallets.removeAttribute('id');
  TransporterAdjusmentPallets.removeAttribute('createdAt');
  TransporterAdjusmentPallets.removeAttribute('updatedAt');
  return TransporterAdjusmentPallets;
};