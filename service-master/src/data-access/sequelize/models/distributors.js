'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distributors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Distributors.associate = function(models) {
        Distributors.hasMany(models.Companies, {as: 'companies'})
      };
    }
  }
  Distributors.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
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
    modelName: 'Distributors',
    tableName: 'mst_distributors',
    // timestamps: true,
    // paranoid: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
  });
  return Distributors;
};