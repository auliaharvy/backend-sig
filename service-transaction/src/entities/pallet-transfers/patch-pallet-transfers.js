const patchPalletTransfer = ({}) => {
  return function make(id, {
    id_company_departure,
    id_company_destination,
    id_company_transporter,
    id_user_checker_sender,
    id_user_approver,
    id_user_checker_receiver,
    id_truck,
    id_driver,
    status,
    update_type,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    reason,
    note,
    updated_by,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of Pallet Transfer.");
    }
    if (!good_pallet) {
      throw new Error("Please enter Good Pallet.");
    }
    if (!tbr_pallet) {
      throw new Error("Please enter TBR Pallet.");
    }
    if (!ber_pallet) {
      throw new Error("Please enter BER Pallet.");
    }
    if (!missing_pallet) {
      throw new Error("Please enter Missing Pallet.");
    }
    return Object.freeze({
      getId: () => id,
      getDeparture: () => id_company_departure,
      getDestination: () => id_company_destination,
      getTransporter: () => id_company_transporter,
      getSender: () => id_user_checker_sender,
      getApprover: () => id_user_approver,
      getReceiver: () => id_user_checker_receiver,
      getTruck: () => id_truck,
      getDriver: () => id_driver,
      getStatus: () => status,
      getReason: () => reason,
      getNote: () => note,
      getUpdateType: () => update_type,
      getGoodPallet: () => good_pallet,
      getTbrPallet: () => tbr_pallet,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchPalletTransfer;
