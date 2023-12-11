const makeCompany = ({}) => {
  return function make({
    id_organization,
    id_company_type,
    name,
    code,
    dist_code,
    dist_name,
    address,
    city,
    phone,
    email,
    tag,
    createdBy,
    updatedBy
  } = {}) {
    if (!id_organization) {
      throw new Error("Please enter Organization.");
    }
    if (!id_company_type) {
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
    // if (!createdBy) {
    //   throw new Error("Please enter Created By.");
    // }
    // if (!updatedBy) {
    //   updatedBy = null;
    // }
    return Object.freeze({
      getOrganization: () => id_organization,
      getCompanyType: () => id_company_type,
      getName: () => name,
      getCode: () => code,
      getDistCode: () => dist_code,
      getDistName: () => dist_name,
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