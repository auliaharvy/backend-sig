const deletePalletRealization = ({ palletRealizationDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await palletRealizationDb.deleteItem({ id });
      let msg = `Pallet Realization was not deleted, please try again.`;
      if (res == 1) {
        msg = `Pallet Realization deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deletePalletRealization;