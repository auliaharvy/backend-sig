const selectDistributor = ({
  distributorsDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    if (id) {
      // select one
      const res = await distributorsDB.selectOne({
        id
      });
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : '-',
            code: e.code ? e.code : '-',
            // is_deleted: e.is_deleted == 0 ? "false" : "true",
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          });
        }
      }
    } else {
      // select all
      const res = await distributorsDB.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : '-',
            code: e.code ? e.code : '-',
            // is_deleted: e.is_deleted == 0 ? "false" : "true",
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          });
        }
      }
    }
    return data;
  };
};

module.exports = selectDistributor;