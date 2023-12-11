const updateCompany = ({
  companiesDB,
  patchCompanies
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchCompanies(id, info);

    data = {
      id: data.getId(),
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
      updatedBy: data.getUpdatedBy(),
    };

    // check id if company exist

    const checkId = await companiesDB.selectOne({
      id: data.id
    });
    //(checkId);
    if (checkId.rowCount == 0)
      throw new Error(`Company doesn't exist, please check.`);

    // check if company exist
    const check = await companiesDB.checkCompanyExistUpdate({
      data
    });
    console.log(check.rows)
    if (check.rowCount > 0)
      throw new Error(`Company already exist, please check.`);

    // update
    const res = await companiesDB.patchCompany({
      data
    });

    let msg = `Company was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Company updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      //(checkId);
    }
  };
};

module.exports = updateCompany;