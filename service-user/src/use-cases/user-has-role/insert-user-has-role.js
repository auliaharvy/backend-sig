const addRoleByUserId = ({
  makeRoleByUserIds,
  userHasRoleDB
}) => {
  return async function post(info) {
    let data = await makeRoleByUserIds(info); // entity

    data = {
      user_id: data.getIdUser(),
      role_id: data.getIdRole(),
      company_id: data.getIdCompany()

    };
    // to do checking if name already exist
    // const check = await userHasRoleDB.checkRoleByUserId({
    //   data
    // });
    // if (check.rowCount > 0)
    //   throw new Error(`Role already exist, please check.`);
    // //   insert
    const res = await userHasRoleDB.insertRoleByUserId({
      data
    });

    // ##
    let msg = `Error on inserting Role By User, please try again.`;

    if (res) {
      msg = `Set User Role has been added successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = addRoleByUserId;