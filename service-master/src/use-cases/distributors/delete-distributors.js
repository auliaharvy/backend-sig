const deleteDistributor = ({
  distributorsDB
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await distributorsDB.deleteDistributor({
      id
    });
    let msg = `Distributor was not deleted, please try again.`;
    if (res == 1) {
      msg = `Distributor deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteDistributor;