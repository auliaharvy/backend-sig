const query = ({ connects, models }) => {
    return Object.freeze({
      selectAll,
    });
  
    async function selectAll({from, to}) {
      try {
        // Tambahkan kode di bawah ini untuk menjalankan permintaan Sequelize
        const res = await models.AllTransactions.findAll({
          where: { 
            created_at: {
              [models.Sequelize.Op.between]: [from, to]
            } 
          },
          order: [['created_at', 'DESC']]
        });
  
        return res;
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  };
  
  module.exports = query;