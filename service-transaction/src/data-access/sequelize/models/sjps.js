'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sjps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sjps.associate = function(models) {
        Sjps.belongsTo(models.Companies, {foreignKey: 'id_departure_company', as: 'departure_company'})
        Sjps.belongsTo(models.Companies, {foreignKey: 'id_destination_company', as: 'destination_company'})
        Sjps.belongsTo(models.Companies, {foreignKey: 'id_transporter_company', as: 'transporter_company'})
      };
    }
  }
  Sjps.init({
    id_departure_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_destination_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_multiple: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    id_transporter_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_truck: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_driver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    second_driver: DataTypes.STRING,
    trx_number: DataTypes.STRING,
    no_do: DataTypes.STRING,
    tonnage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    packaging: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pallet_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    eta: DataTypes.DATEONLY,
    departure_time: DataTypes.DATEONLY,
    trx_status: {
      field: 'trx_status',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    distribution: {
      field: 'distribution',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdBy: {
      field: 'created_by',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      field: 'updated_by',
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
    },
    do_no_sjp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_no_booking: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_no_do: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_tgl_spj: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_tgl_do: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_tgl_minta: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_kwantum: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_kwantumx: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_no_spps: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_nama_sopir: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_kode_da: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_propinsi: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_nama_prop: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_area: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_nama_area: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_sold_to: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_nama_sold_to: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_plant: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    do_nama_plant: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
  }, {
    sequelize,
    modelName: 'Sjps',
    tableName: 'trx_sjp',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Sjps;
};