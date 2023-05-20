const patchSjpStatus = ({}) => {
  return function make(id, {
    id_user_receiver,
    receiving_driver_approval,
    note,
    status,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    updated_by,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of SJP Status.");
    }
    if (!id_user_receiver) {
      throw new Error("Please enter User Receiver.");
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
      getReceiver: () => id_user_receiver,
      getReceivingApproval: () => receiving_driver_approval,
      getNote: () => note,
      getStatus: () => status,
      getGoodPallet: () => good_pallet,
      getTbrPallet: () => tbr_pallet,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = patchSjpStatus;
