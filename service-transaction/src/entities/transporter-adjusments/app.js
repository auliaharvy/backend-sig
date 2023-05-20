// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeTransporterAdjusment = require("./make-transporter-adjusments");
const patchTransporterAdjusment = require("./patch-transporter-adjusments");
// ########
const makeTransporterAdjusments = makeTransporterAdjusment({  });
const patchTransporterAdjusments = patchTransporterAdjusment({  });
// ########
const services = Object.freeze({ makeTransporterAdjusments, patchTransporterAdjusments });

module.exports = services;
module.exports = { makeTransporterAdjusments, patchTransporterAdjusments };