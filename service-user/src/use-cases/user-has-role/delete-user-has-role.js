const deleteRoleByUserId = ({
  makeRoleByUserIds,
  userHasRoleDB
}) => {
  return async function select(info) {
    let data = await makeRoleByUserIds(info); // entity

    data = {
      user_id: data.getIdUser(),
      role_id: data.getIdRole(),
      company_id: data.getIdCompany()
    };
    // delete query
    const res = await userHasRoleDB.deleteRoleByUserId({
      data
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

module.exports = deleteRoleByUserId;