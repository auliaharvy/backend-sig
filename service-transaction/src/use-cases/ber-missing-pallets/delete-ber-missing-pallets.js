const deleteBerMissingPallet = ({ berMissingPalletDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await berMissingPalletDb.deleteItem({ id });
      let msg = `Ber Missing Pallet was not deleted, please try again.`;
      if (res == 1) {
        msg = `Ber Missing Pallet deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteBerMissingPallet;