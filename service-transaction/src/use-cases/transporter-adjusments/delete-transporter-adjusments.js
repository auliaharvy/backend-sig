const deleteTransporterAdjusment = ({ transporterAdjusmentDb }) => {
    return async function select(info) {
      const { id } = info;
      // delete query
      const res = await transporterAdjusmentDb.deleteItem({ id });
      let msg = `Transporter Adjusment was not deleted, please try again.`;
      if (res == 1) {
        msg = `Transporter Adjusment deleted successfully.`;
        return msg;
      } else {
        throw new Error(msg);
      }
    };
  };
  
  module.exports = deleteTransporterAdjusment;