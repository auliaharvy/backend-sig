const selectPermissionByRoleId = ({
  roleHasPermissionDB
}) => {
  return async function select(info) {
    let data = [];

    const {
      user_id
    } = info; // deconstruct

    // select one
    const res = await roleHasPermissionDB.selectPermissionByRoleId({
      user_id
    });
    if (res.rowCount > 0) {
      // only when there is data returned
      const items = res.rows;
      for (let i = 0; i < items.length; i++) {
        const e = items[i];

        // push items to array
        data.push({
          idRole: e.idRole,
          idPermission: e.idPermission,
        });
      }
    }

    return data;
  };
};

module.exports = selectPermissionByRoleId;