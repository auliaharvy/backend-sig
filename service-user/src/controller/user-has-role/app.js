const {
  addsRoleByUserId,
  selectsRoleByUserId,
  deletesRoleByUserId,
} = require("../../use-cases/user-has-role/app");
// #########
const roleByUserIdAdd = require("./insert-user-has-role");
const roleByUserIdSelect = require("./select-user-has-role");
const roleByUserIdDelete = require("./delete-user-has-role");
// #########
const roleByUserIdAdds = roleByUserIdAdd({
  addsRoleByUserId
});
const roleByUserIdSelects = roleByUserIdSelect({
  selectsRoleByUserId
});

const roleByUserIdDeletes = roleByUserIdDelete({
  deletesRoleByUserId
});
// #########
const services = Object.freeze({
  roleByUserIdAdds,
  roleByUserIdSelects,
  roleByUserIdDeletes,
});

module.exports = services;
module.exports = {
  roleByUserIdAdds,
  roleByUserIdSelects,
  roleByUserIdDeletes,
};