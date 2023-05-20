'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompaniesPallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompaniesPallet.belongsTo(models.Pallets, {foreignKey: 'mst_pallet_id'})
      CompaniesPallet.belongsTo(models.Companies, {foreignKey: 'mst_companies_id'})
    }
  }
  CompaniesPallet.init({
    mst_pallet_id: DataTypes.INTEGER,
    mst_companies_id: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'CompaniesPallet',
    tableName: 'mst_pallet_mst_companies',
  });
  CompaniesPallet.removeAttribute('id');
  CompaniesPallet.removeAttribute('createdAt');
  CompaniesPallet.removeAttribute('updatedAt');
  return CompaniesPallet;
};