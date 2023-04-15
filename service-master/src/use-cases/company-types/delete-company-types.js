const deleteCompanyType = ({
  companyTypesDB
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await companyTypesDB.deleteCompanyType({
      id
    });
    let msg = `CompanyType was not deleted, please try again.`;
    if (res == 1) {
      msg = `CompanyType deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteCompanyType;