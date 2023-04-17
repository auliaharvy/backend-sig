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
      idOrganization: data.getOrganization(),
      idCompanyType: data.getCompanyType(),
      name: data.getName(),
      code: data.getCode(),
      address: data.getAddress(),
      city: data.getCity(),
      phone: data.getPhone(),
      email: data.getEmail(),
      tag: data.getTag(),
      createdBy: data.getCreatedBy(),
      updatedBy: data.getUpdatedBy(),
    };

    // check id if company exist

    const checkId = await companiesDB.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Company doesn't exist, please check.`);

    // check if company exist
    const check = await companiesDB.checkCompanyExistUpdate({
      data
    });
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
      console.log(checkId);
    }
  };
};

module.exports = updateCompany;