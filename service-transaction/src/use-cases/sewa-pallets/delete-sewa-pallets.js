const deleteSewaPallet = ({ sewaPalletDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await sewaPalletDb.deleteItem({ id });
      let msg = `Sewa Pallet was not deleted, please try again.`;
      if (res == 1) {
        msg = `Sewa Pallet deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteSewaPallet;