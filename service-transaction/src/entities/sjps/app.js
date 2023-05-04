// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeSjp = require("./make-sjps");
const patchSjp = require("./patch-sjps");
// ########
const makeSjps = makeSjp({  });
const patchSjps = patchSjp({  });
// ########
const services = Object.freeze({ makeSjps, patchSjps });

module.exports = services;
module.exports = { makeSjps, patchSjps };