const deleteSjpStatus = ({ sjpStatusDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await sjpStatusDb.deleteSjpStatus({ id });
      let msg = `SJP Status was not deleted, please try again.`;
      if (res == 1) {
        msg = `SJP Status deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteSjpStatus;