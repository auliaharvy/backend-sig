const deleteCompany = ({
  companiesDB
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await companiesDB.deleteCompany({
      id
    });
    let msg = `Company was not deleted, please try again.`;
    if (res == 1) {
      msg = `Company deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteCompany;