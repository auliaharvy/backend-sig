const query = ({ connects, models }) => {
    return Object.freeze({
      deleteTrxNumber,
      insertNewTrxNumber,
      checkExist,
      selectAll,
      patchTrxNumber
    });
  
    async function deleteTrxNumber({ id }) {
      try {
        // use sequelize on inserting
        const TrxNumber = models.TrxNumbers;
        const res = await TrxNumber.destroy({
          where: {
            id,
          },
        });
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }
  
    async function insertNewTrxNumber({ data }) {
      try {
        // use sequelize on inserting
        const TrxNumber = models.TrxNumbers;
        const res = await TrxNumber.create(data);
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }
  
    async function checkExist( data ) {
      try {
        const TrxNumber = models.TrxNumbers;
        const res = await TrxNumber.findAll({
          where: {
            trx_type: data.trx_type,
            month: data.month,
            year: data.year
          },
        });
  
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }
  
    async function selectAll({}) {
      try {
        const TrxNumber = models.TrxNumbers;
        const res = await TrxNumber.findAll();
  
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }

    async function patchTrxNumber( {dataUpdateTrxNumber} ) {
      try {
        // use sequelize on update
        const TrxNumber = models.TrxNumbers;
        const res = await TrxNumber.update(
          {
            increment_number: dataUpdateTrxNumber.increment_number,
          },
          {
            where: {
              id: dataUpdateTrxNumber.id,
            },
          }
        );
        return res;
      } catch (e) {
        //("Error: ", e);
      }
    }
  };
  
  module.exports = query;