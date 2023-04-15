const addCompanyType = ({
  makeCompanyTypes,
  companyTypesDB
}) => {
  return async function post(info) {
    let data = await makeCompanyTypes(info); // entity

    data = {
      name: data.getCompanyType(),
    };
    // to do checking if name already exist
    const check = await companyTypesDB.checkCompanyTypeExist({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Company Type already exist, please check.`);
    //   insert
    const res = await companyTypesDB.insertCompanyType({
      data
    });

    // ##
    let msg = `Error on inserting Company Type, please try again.`;

    if (res) {
      msg = `Company Type has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addCompanyType;