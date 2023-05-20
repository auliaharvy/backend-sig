const deleteChangeQuota = ({ changeQuotaDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await changeQuotaDb.deleteItem({ id });
      let msg = `Change Quota was not deleted, please try again.`;
      if (res == 1) {
        msg = `Change Quota deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteChangeQuota;