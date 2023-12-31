const addCompany = ({ makeCompanies, companiesDB }) => {
  return async function post(info) {
    let data = await makeCompanies(info); // entity

    data = {
      id_organization: data.getOrganization(),
      id_company_type: data.getCompanyType(),
      name: data.getName(),
      code: data.getCode(),
      dist_code: data.getDistCode(),
      dist_name: data.getDistName(),
      address: data.getAddress(),
      city: data.getCity(),
      phone: data.getPhone(),
      email: data.getEmail(),
      tag: data.getTag(),
      createdBy: data.getCreatedBy(),
      updatedBy: data.getUpdatedBy(),
    };
    // to do checking if name already exist
    const check = await companiesDB.checkCompanyExist({
      data,
    });
    if (check.rowCount > 0)
      throw new Error(`Company already exist, please check.`);

    //   insert
    const res = await companiesDB.insertCompany({
      data,
    });

    // ##
    let msg = `Error on inserting Company, please try again.`;

    if (res) {
      msg = `Company has been added successfully.`;
      return res;
    } else {
      throw new Error(res);
    }
  };
};

module.exports = addCompany;
