const updatePermission = ({
  permissionsDB,
  patchPermissions
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchPermissions(id, info);

    data = {
      id: data.getId(),
      name: data.getPermission(),
    };

    // check id if permission exist
    const checkId = await permissionsDB.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Permission doesn't exist, please check.`);

    // check if permission exist
    const check = await permissionsDB.checkPermissionExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Permission already exist, please check.`);

    // update
    const res = await permissionsDB.patchPermission({
      data
    });

    let msg = `Permission was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Permission updated successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = updatePermission;