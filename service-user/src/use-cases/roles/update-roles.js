const updateRole = ({
  rolesDb,
  patchRoles
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchRoles(id, info);

    data = {
      id: data.getId(),
      name: data.getRole(),
    };

    // check id if role exist
    const checkId = await rolesDb.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`Role doesn't exist, please check.`);

    // check if role exist
    const check = await rolesDb.checkRoleExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Role already exist, please check.`);

    // update
    const res = await rolesDb.patchRole({
      data
    });

    let msg = `Role was not updated, please try again`;
    if (res[0] == 1) {
      msg = `Role updated successfully.`;
      return msg;
    } else {
      // throw new Error(msg);
      console.log(checkId);
    }
  };
};

module.exports = updateRole;