const updateUser = ({
  usersDb,
  patchUsers
}) => {
  return async function put({
    id,
    ...info
  }) {
    let data = patchUsers(id, info);

    data = {
      id: data.getId(),
      userName: data.getUsername(),
      fullName: data.getFullname(),
      email: data.getEmail(),
      password: data.getPassword(),
    };

    // check id if employee exist
    const checkId = await usersDb.selectOne({
      id: data.id
    });
    if (checkId.rowCount == 0)
      throw new Error(`User doesn't exist, please check.`);

    // check if name exist
    const check = await usersDb.checkNameExistUpdate({
      data
    });
    if (check.rowCount > 0)
      throw new Error(`User already exist, please check.`);

    // update
    const res = await usersDb.patchUser({
      data
    });

    let msg = `User was not updated, please try again`;
    if (res[0] == 1) {
      msg = `User updated successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = updateUser;