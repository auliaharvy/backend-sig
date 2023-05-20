const makePalletTransfer = ({}) => {
  return function make({
    id_company_departure,
    id_company_destination,
    id_company_transporter,
    // id_user_checker_sender,
    // id_user_checker_receiver,
    id_truck,
    id_driver,
    // second_driver,
    // trx_code,
    status,
    reason,
    note,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    created_by,
    updated_by,
  } = {}) {
    if (!id_company_departure) {
      throw new Error("Please enter Departure Company.");
    }
    if (!id_company_destination) {
      throw new Error("Please enter Destination Company.");
    }
    if (!id_company_transporter) {
      throw new Error("Please enter Transporter Company.");
    }
    // if (!id_user_checker_sender) {
    //   throw new Error("Please enter User Sender.");
    // }
    if (!id_truck) {
      throw new Error("Please enter Truck.");
    }
    if (!id_driver) {
      throw new Error("Please enter Driver.");
    }
    // if (!reason) {
    //   throw new Error("Please enter Reason.");
    // }
    // if (!note) {
    //   throw new Error("Please enter Reason.");
    // }
    // if (!status) {
    //   throw new Error("Please enter Status.");
    // }
    if (!good_pallet) {
      throw new Error("Please enter Good Pallet.");
    }
    if (!tbr_pallet) {
      throw new Error("Please enter TBR Pallet.");
    }
    // if (!ber_pallet) {
    //   throw new Error("Please enter BER Pallet.");
    // }
    // if (!missing_pallet) {
    //   throw new Error("Please enter Missing Pallet.");
    // }
    
    return Object.freeze({
      getDeparture: () => id_company_departure,
      getDestination: () => id_company_destination,
      getTransporter: () => id_company_transporter,
      // getSender: () => id_user_checker_sender,
      getTruck: () => id_truck,
      getDriver: () => id_driver,
      getStatus: () => status,
      getReason: () => reason,
      getNote: () => note,
      getGoodPallet: () => good_pallet,
      getTbrPallet: () => tbr_pallet,
      getBerPallet: () => ber_pallet,
      getMissingPallet: () => missing_pallet,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
    });
  };
};

module.exports = makePalletTransfer;
