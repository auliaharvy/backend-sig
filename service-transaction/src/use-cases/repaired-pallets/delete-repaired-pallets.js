const deleteRepairedPallet = ({ repairedPalletDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await repairedPalletDb.deleteItem({ id });
      let msg = `Repaired Pallet was not deleted, please try again.`;
      if (res == 1) {
        msg = `Repaired Pallet deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteRepairedPallet;