const deleteOrganization = ({
  organizationsDB
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await organizationsDB.deleteOrganization({
      id
    });
    let msg = `Organization was not deleted, please try again.`;
    if (res == 1) {
      msg = `Organization deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteOrganization;