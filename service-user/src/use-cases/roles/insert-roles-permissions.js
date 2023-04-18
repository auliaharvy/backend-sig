const addRolePermission = ({
  makeRolesPermissions,
  rolesDB
}) => {
  return async function post(info) {
    let data_get = await makeRolesPermissions(info); // entity

    datas = data_get.getData();
    contoh = {
      '0': { id_role: 1, id_permission: 1 },
      '1': { id_role: 1, id_permission: 2 }
    };
    // to do checking if name already exist
    for (var i = 0; i < datas.data.length; i++) {
      data = {
        id_role: datas.data[i].id_role,
        id_permission: datas.data[i].id_permission,
      };
      const check = await rolesDB.checkRolePermissionExist({
        data
      });
      if (check.rowCount > 0)
        throw new Error(`Role Permission already set, please check.`);
      
      
    }
    data_insert = datas.data;
    const res = await rolesDB.insertRolePermission({
      data_insert
    });

    // ##
    let msg = `Error on inserting Role Permissions, please try again.`;

    if (res) {
      msg = `Role Permission has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }


  };
};

module.exports = addRolePermission;