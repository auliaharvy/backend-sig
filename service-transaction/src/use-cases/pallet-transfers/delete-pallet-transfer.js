const deletePalletTransfer = ({ palletTransfersDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await palletTransfersDb.deletePalletTransfer({ id });
      let msg = `Pallet Transfer was not deleted, please try again.`;
      if (res == 1) {
        msg = `Pallet Transfer deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deletePalletTransfer;