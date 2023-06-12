const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const companiesDB = query({
    connects,
    models,
});
// ######

module.exports = companiesDB;