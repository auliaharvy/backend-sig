const deleteSjp = ({ sjpDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await sjpDb.deleteSjp({ id });
      let msg = `SJP was not deleted, please try again.`;
      if (res == 1) {
        msg = `SJP deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteSjp;