const selectDriver = ({ driversDb }) => {
  return async function select(info) {
    let data = [];

    const { id } = info; // deconstruct

    if (id) {
      // select one
      const res = await driversDb.selectOne({
        id,
      });
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            id_company: e.id_company,
            name: e.name,
            company_name: e.company_name,
          });
        }
      }
    } else {
      // select all
      const res = await driversDb.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            id_company: e.id_company,
            name: e.name,
            company_name: e.company_name,
          });
        }
      }
    }
    return data;
  };
};

module.exports = selectDriver;
