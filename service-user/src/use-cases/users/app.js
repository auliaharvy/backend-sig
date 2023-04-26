const {
  makeUsers,
  patchUsers,
  dataloginUsers,
} = require("../../entities/users/app"); // entity
const usersDB = require("../../data-access/users/app"); // database queries
const {
  encrypt,
  decrypt
} = require("../../functions/app");
const bcrypt = require('bcrypt');
// #########
const registerUser = require("./insert-user");
const loginUser = require("./login-user");
const selectUser = require("./select-users");
const updateUser = require("./update-user");
const deleteUser = require("./delete-user");
// #########
const registerUsers = registerUser({
  makeUsers,
  usersDB,
  bcrypt
});
const loginUsers = loginUser({
  dataloginUsers,
  usersDB,
  bcrypt
});
const selectUsers = selectUser({
  usersDB
});
const updateUsers = updateUser({
  usersDB,
  patchUsers
});
const deleteUsers = deleteUser({
  usersDB
});
// #########
const services = Object.freeze({
  registerUsers,
  selectUsers,
  updateUsers,
  deleteUsers,
  loginUsers,
});

module.exports = services;
module.exports = {
  registerUsers,
  selectUsers,
  updateUsers,
  deleteUsers,
  loginUsers,
};