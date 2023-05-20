const deleteNewPallet = ({ newPalletDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await newPalletDb.deleteItem({ id });
      let msg = `New Pallet was not deleted, please try again.`;
      if (res == 1) {
        msg = `New Pallet deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteNewPallet;