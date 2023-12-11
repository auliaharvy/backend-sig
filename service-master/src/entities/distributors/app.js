// const { encrypt, decrypt } = require("../../functions/app");
// ########
const makeDistributor = require("./make-distributors");
const patchDistributor = require("./patch-distributors");
// ########
const makeDistributors = makeDistributor({});
const patchDistributors = patchDistributor({});
// ########
const services = Object.freeze({
    makeDistributors,
    patchDistributors,

});

module.exports = services;
module.exports = {
    makeDistributors,
    patchDistributors,
};