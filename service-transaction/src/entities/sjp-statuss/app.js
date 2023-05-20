// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeSjpStatus = require("./make-sjp-statuss");
const patchSjpStatus = require("./patch-sjp-statuss");
// ########
const makeSjpStatuss = makeSjpStatus({  });
const patchSjpStatuss = patchSjpStatus({  });
// ########
const services = Object.freeze({ makeSjpStatuss, patchSjpStatuss });

module.exports = services;
module.exports = { makeSjpStatuss, patchSjpStatuss };