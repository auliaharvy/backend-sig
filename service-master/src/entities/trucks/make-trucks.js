const makeTruck = ({}) => {
  return function make({
    id_company,
    license_plate,
    createdBy,
    updatedBy
  } = {}) {
    // if (!id_company) {
    //   throw new Error("Please enter Company.");
    // }
    if (!license_plate) {
      throw new Error("Please enter License Plate.");
    }
    if (!createdBy) {
      throw new Error("Please enter Created By.");
    }
    if (!updatedBy) {
      updatedBy = null;
    }
    return Object.freeze({
      getCompany: () => id_company,
      getLicensePlate: () => license_plate,
      getCreatedBy: () => createdBy,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = makeTruck;