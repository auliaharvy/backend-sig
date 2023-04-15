const makeCompany = ({}) => {
  return function make({
    idOrganization,
    idCompanyType,
    name,
    code,
    address,
    city,
    phone,
    email,
    tag,
    createdBy,
    updatedBy
  } = {}) {
    if (!idOrganization) {
      throw new Error("Please enter Organization.");
    }
    if (!idCompanyType) {
      throw new Error("Please enter Company Type.");
    }
    if (!name) {
      throw new Error("Please enter Name Company.");
    }
    if (!code) {
      throw new Error("Please enter Code.");
    }
    if (!address) {
      throw new Error("Please enter Address.");
    }
    if (!city) {
      throw new Error("Please enter City.");
    }
    if (!phone) {
      throw new Error("Please enter Phone.");
    }
    if (!email) {
      throw new Error("Please enter Email.");
    }
    if (!tag) {
      throw new Error("Please enter Tag.");
    }
    if (!createdBy) {
      throw new Error("Please enter Created By.");
    }
    if (!updatedBy) {
      updatedBy = null;
    }
    return Object.freeze({
      getOrganization: () => idOrganization,
      getCompanyType: () => idCompanyType,
      getName: () => name,
      getCode: () => code,
      getAddress: () => address,
      getCity: () => city,
      getPhone: () => phone,
      getEmail: () => email,
      getTag: () => tag,
      getCreatedBy: () => createdBy,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = makeCompany;