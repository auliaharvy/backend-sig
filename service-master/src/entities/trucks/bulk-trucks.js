const bulkTruck = ({}) => {
  return function make({
    id_company,
    data,
    createdBy,
    updatedBy
  } = {}) {
    // if (!id_company) {
    //   throw new Error("Please enter Company.");
    // }
    if (!data) {
      throw new Error("Please enter data.");
    }
    if (!createdBy) {
      throw new Error("Please enter Created By.");
    }
    if (!updatedBy) {
      updatedBy = null;
    }
    return Object.freeze({
      getCompany: () => id_company,
      getData: () => data,
      getCreatedBy: () => createdBy,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = bulkTruck;