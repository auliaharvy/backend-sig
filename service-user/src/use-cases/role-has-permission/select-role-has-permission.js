const selectPermissionByRoleId = ({
  roleHasPermissionDB
}) => {
  return async function select(info) {
    let data = [];
    console.log(info)
    const {
      id
    } = info; // deconstruct

    // select one
    const res = await roleHasPermissionDB.selectPermissionByRoleId({
      id
    });
    if (res.rowCount > 0) {
      // only when there is data returned
      const items = res.rows;
      for (let i = 0; i < items.length; i++) {
        const e = items[i];

        // push items to array
        data.push({
          id_role: e.id_role,
          id_permission: e.id_permission,
          role_name: e.role_name,
          permission_name: e.permission_name,
        });
      }
    }
    return data;
  };
};

module.exports = selectPermissionByRoleId;