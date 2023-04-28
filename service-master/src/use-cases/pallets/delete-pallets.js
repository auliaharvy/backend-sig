const deletePallet = ({
  palletsDB
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await palletsDB.deletePallet({
      id
    });
    let msg = `Pallet was not deleted, please try again.`;
    if (res == 1) {
      msg = `Pallet deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deletePallet;