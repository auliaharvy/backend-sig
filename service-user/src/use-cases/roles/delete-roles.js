const deleteRole = ({
  rolesDb
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await rolesDb.deleteRole({
      id
    });
    let msg = `Role was not deleted, please try again.`;
    if (res == 1) {
      msg = `Role deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteRole;