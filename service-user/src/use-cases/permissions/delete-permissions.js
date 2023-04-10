const deletePermission = ({
  permissionsDb
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await PermissionsDb.deletePermission({
      id
    });
    let msg = `Permission was not deleted, please try again.`;
    if (res == 1) {
      msg = `Permission deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deletePermission;