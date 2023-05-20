const makeSjpStatus = ({}) => {
  return function make({
    id_sjp,
    id_user_sender,
    id_departure_company,
    id_destination_company,
    id_transporter_company,
    sending_driver_approval,
    note,
    status,
    good_pallet,
    tbr_pallet,
    ber_pallet,
    missing_pallet,
    is_sendback,
    created_by,
    updated_by,
  } = {}) {
    if (!id_sjp) {
      throw new Error("Please enter SJP Number.");
    }
    if (!id_user_sender) {
      throw new Error("Please enter User Sender.");
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
    if (!good_pallet) {
      throw new Error("Please enter Good Pallet.");
    }
    
    return Object.freeze({
      getSjp: () => id_sjp,
      getSender: () => id_user_sender,
      getDeparture: () => id_departure_company,
      getDestination: () => id_destination_company,
      getTransporter: () => id_transporter_company,
      getDriverApproval: () => sending_driver_approval,
      getStatus: () => status,
      getIsSendback: () => is_sendback,
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

module.exports = makeSjpStatus;
