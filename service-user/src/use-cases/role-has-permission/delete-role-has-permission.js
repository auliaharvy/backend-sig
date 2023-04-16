const deletePermissionByRoleId = ({
  roleHasPermissionDB
}) => {
  return async function select(info) {
    const {
      user_id
    } = info;
    // delete query
    const res = await roleHasPermissionDB.deletePermissionByRoleId({
      user_id
    });
    let msg = `Role By User was not deleted, please try again.`;
    if (res == 1) {
      msg = `Role By User deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deletePermissionByRoleId;