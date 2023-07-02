const patchTruck = ({
  encrypt
}) => {
  return function make(id, {
    id_company,
    license_plate,
    transporter_code,
    updatedBy
  } = {}) {
    if (!id_company) {
      throw new Error("Please enter Company.");
    }
    if (!license_plate) {
      throw new Error("Please enter License Plate.");
    }
    if (!transporter_code) {
      throw new Error("Please enter Transporter Code.");
    }
    if (!updatedBy) {
      updatedBy = null;
    }
    return Object.freeze({
      getId: () => id,
      getCompany: () => id_company,
      getLicensePlate: () => license_plate,
      getTransporterCode: () => transporter_code,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = patchTruck;