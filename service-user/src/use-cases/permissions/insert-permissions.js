const addPermission = ({
  makePermissions,
  permissionsDB
}) => {
  return async function post(info) {
    let data = await makePermissions(info); // entity

    data = {
      name: data.getPermission(),
    };
    // to do checking if name already exist
    const check = await permissionsDB.checkPermissionExist({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Permission already exist, please check.`);
    //   insert
    const res = await permissionsDB.insertPermission({
      data
    });

    // ##
    let msg = `Error on inserting Permission, please try again.`;

    if (res) {
      msg = `Permission has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addPermission;