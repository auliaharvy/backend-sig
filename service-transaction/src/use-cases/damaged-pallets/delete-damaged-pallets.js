const deleteDamagedPallet = ({ damagedPalletDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await damagedPalletDb.deleteItem({ id });
      let msg = `Damaged Pallet was not deleted, please try again.`;
      if (res == 1) {
        msg = `Damaged Pallet deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteDamagedPallet;