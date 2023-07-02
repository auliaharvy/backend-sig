const makeSjp = ({}) => {
  return function make({
    id_departure_company,
    id_destination_company,
    id_transporter_company,
    id_truck,
    id_driver,
    // second_driver,
    trx_number,
    is_multiple,
    truck_number,
    driver,
    destination_code,
    destination,
    departure_code,
    transporter_code,
    transporter,
    no_do,
    tonnage,
    packaging,
    product_quantity,
    pallet_quantity,
    eta,
    departure_time,
    photo,
    // trx_status,
    // distribution,
    created_by,
    updated_by,
  } = {}) {
    if (!id_departure_company) {
      throw new Error("Please enter Departure Company.");
    }
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
    if (!no_do) {
      throw new Error("Please enter No DO.");
    }
    if (!pallet_quantity) {
      throw new Error("Please enter Pallet Quantity.");
    }
    if (!photo) {
      throw new Error("Please enter Photo.");
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
      getIsMultiple: () => is_multiple,
      getNoDo: () => no_do,
      getTonnage: () => tonnage,
      getPackaging: () => packaging,
      getProductQuantity: () => product_quantity,
      getPalletQuantity: () => pallet_quantity,
      getEta: () => eta,
      getDepartureTime: () => departure_time,
      getCreatedBy: () => created_by,
      getUpdatedBy: () => updated_by,
      getTrxNumber: () => trx_number,
      getTruckNumber: () => truck_number,
      getDriverName: () => driver,
      getDestinationCode: () => destination_code,
      getDestinationName: () => destination,
      getDepartureCode: () => departure_code,
      getTransporterCode: () => transporter_code,
      getTransporterName: () => transporter,
      getPhoto: () => photo,
    });
  };
};

module.exports = makeSjp;
