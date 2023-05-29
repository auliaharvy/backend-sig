const patchSjpStatus = ({}) => {
  return function make(id, {
    id_sjp,
    id_user_receiver,
    id_departure_company,
    id_destination_company,
    id_transporter_company,
    receiving_driver_approval,
    note,
    status,
    send_good_pallet,
    send_tbr_pallet,
    send_ber_pallet,
    send_missing_pallet,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    is_sendback,
    sjp_status,
    created_by,
    updated_by,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of SJP Status.");
    }
    if (!id_user_receiver) {
      throw new Error("Please enter User Receiver.");
    }
    if (!id_departure_company) {
      throw new Error("Please enter Departure Company.");
    }
    if (!id_destination_company) {
      throw new Error("Please enter Destination Company.");
    }
    if (!id_transporter_company) {
      throw new Error("Please enter Transporter Company.");
    }
    // if (!good_pallet) {
    //   throw new Error("Please enter Good Pallet.");
    // }
    // if (!tbr_pallet) {
    //   throw new Error("Please enter TBR Pallet.");
    // }
    // if (!ber_pallet) {
    //   throw new Error("Please enter BER Pallet.");
    // }
    // if (!missing_pallet) {
    //   throw new Error("Please enter Missing Pallet.");
    // }
    return Object.freeze({
      getSjp: () => id_sjp,
      getReceiver: () => id_user_receiver,
      getDeparture: () => id_departure_company,
      getDestination: () => id_destination_company,
      getTransporter: () => id_transporter_company,
      getDriverApproval: () => receiving_driver_approval,
      getStatus: () => status,
      getIsSendback: () => is_sendback,
      getNote: () => note,
      getSendGoodPallet: () => send_good_pallet,
      getSendTbrPallet: () => send_tbr_pallet,
      getSendBerPallet: () => send_ber_pallet,
      getSendMissingPallet: () => send_missing_pallet,
      getGoodPallet: () => good_pallet,
      getTbrPallet: () => tbr_pallet,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
      getSjpStatus: () => sjp_status,
    });
  };
};

module.exports = patchSjpStatus;
