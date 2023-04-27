const selectUser = ({
  usersDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      id
    } = info; // deconstruct

    if (id) {
      // select one
      const res = await usersDB.selectOne({
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
            fullname: e.fullname ? e.fullname : null,
            username: e.username ? e.username : null,
            email: e.email ? e.email : null,
          });
        }
      }
      return ({
        status: 200,
        message: "Success",
        data: data
      })
    } else {
      // select all
      const res = await usersDB.selectAll({});
      if (res.rowCount > 0) {
        // only when there is data returned
        const items = res.rows;
        for (let i = 0; i < items.length; i++) {
          const e = items[i];

          // push items to array
          data.push({
            id: e.id,
            fullname: e.fullname ? e.fullname : null,
            username: e.username ? e.username : null,
            email: e.email ? e.email : null,
          });
        }
      }
    }
    return ({
      status: 200,
      message: "Success",
      data: data
    })
  };
};

module.exports = selectUser;