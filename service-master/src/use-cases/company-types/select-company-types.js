const selectCompanyType = ({
  companyTypesDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    if (id) {
      // select one
      const res = await companyTypesDB.selectOne({
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
            name: e.name ? e.name : null,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          });
        }
      }
      return data;
    } else {
      // select all
      const res = await companyTypesDB.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : null,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          });
        }
      }
    }
    return data;
  };
};

module.exports = selectCompanyType;