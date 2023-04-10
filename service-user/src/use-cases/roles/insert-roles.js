const addRole = ({
  makeRoles,
  rolesDB
}) => {
  return async function post(info) {
    let data = await makeRoles(info); // entity

    data = {
      name: data.getRole(),
    };
    // to do checking if name already exist
    const check = await rolesDB.checkRoleExist({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`Role already exist, please check.`);
    //   insert
    const res = await rolesDB.insertRole({
      data
    });

    // ##
    let msg = `Error on inserting Role, please try again.`;

    if (res) {
      msg = `Role has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addRole;