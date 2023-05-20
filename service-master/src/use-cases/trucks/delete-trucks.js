const deleteTruck = ({
  trucksDb
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await trucksDb.deleteTruck({
      id
    });
    let msg = `Truck was not deleted, please try again.`;
    if (res == 1) {
      msg = `Truck deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteTruck;