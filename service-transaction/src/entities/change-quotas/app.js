// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeChangeQuota = require("./make-change-quotas");
const patchChangeQuota = require("./patch-change-quotas");
// ########
const makeChangeQuotas = makeChangeQuota({  });
const patchChangeQuotas = patchChangeQuota({  });
// ########
const services = Object.freeze({ makeChangeQuotas, patchChangeQuotas });

module.exports = services;
module.exports = { makeChangeQuotas, patchChangeQuotas };