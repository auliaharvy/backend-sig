const patchSjp = ({}) => {
  return function make(id, {
    id_departure_company,
    id_destination_company,
    id_new_destination_company,
    id_new_truck,
    id_transporter_company,
    id_truck,
    id_driver,
    second_driver,
    is_multiple,
    // trx_number,
    no_do,
    tonnage,
    packaging,
    product_quantity,
    pallet_quantity,
    trx_status,
    distribution,
    // created_by,
    updated_by,
    change_type,
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of company.");
    }
    // if (!id_departure_company) {
    //   throw new Error("Please enter Departure Company.");
    // }
    // if (!id_destination_company) {
    //   throw new Error("Please enter Destination Company.");
    // }
    // if (!id_transporter_company) {
    //   throw new Error("Please enter Transporter Company.");
    // }
    // if (!id_truck) {
    //   throw new Error("Please enter Truck.");
    // }
    // if (!id_driver) {
    //   throw new Error("Please enter Driver.");
    // }
    // if (!no_do) {
    //   throw new Error("Please enter No DO.");
    // }
    // if (!pallet_quantity) {
    //   throw new Error("Please enter Pallet Quantity.");
    // }
    if (!change_type) {
      throw new Error("Please enter Change Type.");
    }
    // if (!trx_number) {
    //   throw new Error("Please enter Driver.");
    // }
    // if (!second_driver) {
    //   throw new Error("Please enter Driver.");
    // }
    return Object.freeze({
      getId: () => id,
      getDeparture: () => id_departure_company,
      getDestination: () => id_destination_company,
      getNewDestination: () => id_new_destination_company,
      getTransporter: () => id_transporter_company,
      getTruck: () => id_truck,
      getNewTruck: () => id_new_truck,
      getIsMultiple: () => is_multiple,
      getDriver: () => id_driver,
      getSecondDriver: () => second_driver,
      getNoDo: () => no_do,
      getTonnage: () => tonnage,
      getPackaging: () => packaging,
      getProductQuantity: () => product_quantity,
      getPalletQuantity: () => pallet_quantity,
      getDistribution: () => distribution,
      getUpdatedBy: () => updated_by,
      getTrxStatus: () => trx_status,
      getChangeType: () => change_type,
    });
  };
};

module.exports = patchSjp;
