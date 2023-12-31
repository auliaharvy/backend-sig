const selectRole = ({
  rolesDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    if (id) {
      // select one
      const res = await rolesDB.selectOne({
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
          });
        }
      }
      return ({
        status: 200,
        message: "Success",
        data: data
      });
    } else {
      // select all
      const res = await rolesDB.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : null,
          });
        }
      }
      return ({
        status: 200,
        message: "Success",
        data: data
      });
    }
  };
};

module.exports = selectRole;