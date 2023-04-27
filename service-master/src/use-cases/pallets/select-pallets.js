const selectPallet = ({
  palletsDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    if (id) {
      // select one
      const res = await palletsDB.selectOne({
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
            created_by: e.created_by ? e.created_by : null,
            updated_by: e.updated_by ? e.updated_by : null,
          });
        }
      }
      return ({
        status: 200,
        message: "Success",
        data: data,
      });
    } else {
      // select all
      const res = await palletsDB.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            name: e.name ? e.name : null,
            created_by: e.created_by ? e.created_by : null,
            updated_by: e.updated_by ? e.updated_by : null,
          });
        }
      }
    }
    return ({
      status: 200,
      message: "Success",
      data: data,
    });
  };
};

module.exports = selectPallet;