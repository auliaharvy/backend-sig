const selectUser = ({ usersDB}) => {
    return async function select(info) {
      let data = [];
  
      const { id } = info; // deconstruct
  
      if (id) {
        // select one
        const res = await usersDB.selectOne({ id });
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
              active: e.is_deleted == 0 ? "active" : "inactive",
              createdAt: e.createdAt,
              updatedAt: e.updatedAt,
            });
          }
        }
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
              active: e.is_deleted == 0 ? "active" : "inactive",
              created_at: e.created_at,
              updated_at: e.updated_at,
            });
          }
        }
      }
      return data;
    };
  };
  
  module.exports = selectUser;