const updateCompanyType = ({
  companyTypesDB,
  patchCompanyTypes
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchCompanyTypes(id, info);

    data = {
      id: data.getId(),
      name: data.getCompanyType(),
    };

    // check id if companytype exist

    const checkId = await companyTypesDB.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`CompanyType doesn't exist, please check.`);

    // check if companytype exist
    const check = await companyTypesDB.checkCompanyTypeExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Company Type already exist, please check.`);

    // update
    const res = await companyTypesDB.patchCompanyType({
      data
    });

    let msg = `Company Type was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Company Type updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      //(checkId);
    }
  };
};

module.exports = updateCompanyType;