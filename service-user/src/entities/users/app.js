// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeUser = require("./make-users");
const dataloginUser = require("./datalogin-users");
const patchUser = require("./patch-user");
// ########
const makeUsers = makeUser({  });
const dataloginUsers = dataloginUser({  });
const patchUsers = patchUser({  });
// ########
const services = Object.freeze({ makeUsers, patchUsers, dataloginUsers });

module.exports = services;
module.exports = { makeUsers, patchUsers, dataloginUsers };