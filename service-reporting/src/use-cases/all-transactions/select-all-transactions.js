const selectAllTransaction = ({ allTransactionsDb }) => {
  return async function select(info) {
    let data = [];
    const { from, to } = info;

    // select all
    const res = await allTransactionsDb.selectAll({from, to});
    if (res) {
      // only when there is data returned
      const items = res;
      // console.log(items);
      for (let i = 0; i < items.length; i++) {
        const e = items[i].dataValues;
        // push items to array
        data.push(e);
      }
    }
    return data;
  };
};

module.exports = selectAllTransaction;
