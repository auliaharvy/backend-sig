const patchTruck = ({
  encrypt
}) => {
  return function make(id, {
    id_company,
    license_plate,
    updatedBy
  } = {}) {
    if (!id_company) {
      throw new Error("Please enter Company.");
    }
    if (!license_plate) {
      throw new Error("Please enter Name.");
    }
    if (!updatedBy) {
      updatedBy = null;
    }
    return Object.freeze({
      getId: () => id,
      getCompany: () => id_company,
      getLicensePlate: () => license_plate,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = patchTruck;