const deleteUser = ({
  usersDB
}) => {
  return async function select(info) {
    const {
      id
    } = info;
    // delete query
    const res = await usersDB.deleteUser({
      id
    });
    let msg = `User was not deleted, please try again.`;
    if (res == 1) {
      msg = `User deleted successfully.`;
      return msg;
    } else {
      throw new Error(msg);
    }
  };
};

module.exports = deleteUser;