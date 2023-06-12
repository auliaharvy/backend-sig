const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const driversDb = query({
    connects,
    models,
});
// ######

module.exports = driversDb;