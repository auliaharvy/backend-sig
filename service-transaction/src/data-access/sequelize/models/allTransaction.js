'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AllTransactions.init({
    log_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trx_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_sjp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_sjp_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_pallet_transfer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_claim_pallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_biaya_sewa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_change_quota: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_new_pallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_new_pallet_realisation: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_change_destination: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_change_truck: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transaction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_do: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    new_no_do: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sender_reporter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiver_approver: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_departure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_new_destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_transporter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    truck_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    truck_number_new: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driver_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    driver_name_new: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    good_pallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tbr_pallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ber_pallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    missing_pallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sending_approval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiver_approval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
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
  }, {
    sequelize,
    modelName: 'AllTransactions',
    tableName: 'log_trx_all_transaction',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return AllTransactions;
};