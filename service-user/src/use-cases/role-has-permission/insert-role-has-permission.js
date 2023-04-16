const addPermissionByRoleId = ({
  makePermissionByRoleIds,
  roleHasPermissionDB
}) => {
  return async function post(info) {
    let data = await makePermissionByRoleIds(info); // entity

    data = {

      idRole: data.getIdRole(),
      idPermission: data.getIdPermission(),


    };
    // to do checking if name already exist
    // const check = await roleHasPermissionDB.selectPermissionByRoleId({
    //   data
    // });
    // if (check.rowCount > 0) {
    // // delete query
    // const hapus = await roleHasPermissionDB.deletePermissionByRoleId({
    //   idUser
    // });
    //   insert
    const res = await roleHasPermissionDB.insertPermissionByRoleId({
      data
    });

    // } else {
    //   //   insert
    //   const res = await roleHasPermissionDB.insertPermissionByRoleId({
    //     data
    //   });

    // };

    // ##
    let msg = `Error on inserting Role, please try again.`;

    if (res) {
      msg = `Role By User id has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addPermissionByRoleId;