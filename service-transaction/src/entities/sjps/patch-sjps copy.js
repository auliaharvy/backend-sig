const patchSjp = ({}) => {
  return function make({
    id_departure_company,
    id_destination_company,
    id_transporter_company,
    id_truck,
    id_driver,
    // second_driver,
    // trx_number,
    no_do,
    // tonnage,
    // packaging,
    // product_quantity,
    pallet_quantity,
    // trx_status,
    // distribution,
    // created_by,
    // updated_by,
  } = {}) {
    if (!id_departure_company) {
      throw new Error("Please enter Departure Company.");
    }
    if (!id_destination_company) {
      throw new Error("Please enter Destination Company.");
    }
    if (!id_transporter_company) {
      throw new Error("Please enter Transporter Company.");
    }
    if (!id_truck) {
      throw new Error("Please enter Truck.");
    }
    if (!id_driver) {
      throw new Error("Please enter Driver.");
    }
    if (!no_do) {
      throw new Error("Please enter No DO.");
    }
    if (!pallet_quantity) {
      throw new Error("Please enter Pallet Quantity.");
    }
    // if (!trx_number) {
    //   throw new Error("Please enter Driver.");
    // }
    // if (!second_driver) {
    //   throw new Error("Please enter Driver.");
    // }
    return Object.freeze({
      getDeparture: () => id_departure_company,
      getDestination: () => id_destination_company,
      getTransporter: () => id_transporter_company,
      getTruck: () => id_truck,
      getDriver: () => id_driver,
      getNoDo: () => no_do,
      getPalletQuantity: () => pallet_quantity,
    });
  };
};

module.exports = patchSjp;
