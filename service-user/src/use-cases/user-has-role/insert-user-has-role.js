const addRoleByUserId = ({
  makeRoleByUserIds,
  userHasRoleDB
}) => {
  return async function post(info) {
    let data = await makeRoleByUserIds(info); // entity

    data = {
      idUser: data.getIdUser(),
      idRole: data.getIdRole(),
      idCompany: data.getIdCompany()

    };
    // to do checking if name already exist
    // const check = await userHasRoleDB.selectRoleByUserId({
    //   data
    // });
    // if (check.rowCount > 0) {
    // // delete query
    // const hapus = await userHasRoleDB.deleteRoleByUserId({
    //   idUser
    // });
    //   insert
    const res = await userHasRoleDB.insertRoleByUserId({
      data
    });

    // } else {
    //   //   insert
    //   const res = await userHasRoleDB.insertRoleByUserId({
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

module.exports = addRoleByUserId;