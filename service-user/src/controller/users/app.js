const {
    loginUsers,
    registerUsers,
    selectUsers,
    updateUsers,
    deleteUsers,
  } = require("../../use-cases/users/app");
  // #########
  const userRegister = require("./insert-user");
  const userLogin = require("./login-user");
  const userSelect = require("./select-users");
  const usersUpdate = require("./update-users");
  const usersDelete = require("./delete-user");
  // #########
  const userRegisters = userRegister({ registerUsers });
  const usersSelects = userSelect({ selectUsers });
  const usersLogin = userLogin({ loginUsers });
  const usersUpdates = usersUpdate({ updateUsers });
  const usersDeletes = usersDelete({ deleteUsers });
  // #########
  const services = Object.freeze({
    userRegisters,
    usersSelects,
    usersUpdates,
    usersDeletes,
    usersLogin,
  });
  
  module.exports = services;
  module.exports = {
    userRegisters,
    usersSelects,
    usersUpdates,
    usersDeletes,
    usersLogin,
  };