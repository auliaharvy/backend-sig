const deleteClaimPallet = ({ claimPalletDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await claimPalletDb.deleteItem({ id });
      let msg = `Claim Pallet was not deleted, please try again.`;
      if (res == 1) {
        msg = `Claim Pallet deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteClaimPallet;