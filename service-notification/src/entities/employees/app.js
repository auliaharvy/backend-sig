// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeEmployee = require("./make-employees");
const patchEmployee = require("./patch-employee");
// ########
const makeEmployees = makeEmployee({  });
const patchEmployees = patchEmployee({  });
// ########
const services = Object.freeze({ makeEmployees, patchEmployees });

module.exports = services;
module.exports = { makeEmployees, patchEmployees };