const patchDriver = ({
  encrypt
}) => {
  return function make(id, {
    id_company,
    name,
    createdBy,
    updatedBy
  } = {}) {
    if (!id_company) {
      throw new Error("Please enter Company.");
    }
    if (!name) {
      throw new Error("Please enter Name.");
    }
    if (!createdBy) {
      throw new Error("Please enter Created By.");
    }
    if (!updatedBy) {
      updatedBy = null;
    }
    return Object.freeze({
      getId: () => id,
      getCompany: () => id_company,
      getName: () => name,
      getCreatedBy: () => createdBy,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = patchDriver;