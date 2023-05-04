const patchCompany = ({
  encrypt
}) => {
  return function make(id, {
    id_organization,
    id_company_type,
    name,
    code,
    address,
    city,
    phone,
    email,
    tag,
    updatedBy
  } = {}) {
    if (!id) {
      throw new Error("Please enter ID of company.");
    }
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
    if (!updatedBy) {
      throw new Error("Please enter Updated By.");
    }
    return Object.freeze({
      getId: () => id,
      getOrganization: () => id_organization,
      getCompanyType: () => id_company_type,
      getName: () => name,
      getCode: () => code,
      getAddress: () => address,
      getCity: () => city,
      getPhone: () => phone,
      getEmail: () => email,
      getTag: () => tag,
      // getCreatedBy: () => createdBy,
      getUpdatedBy: () => updatedBy,

    });
  };
};

module.exports = patchCompany;