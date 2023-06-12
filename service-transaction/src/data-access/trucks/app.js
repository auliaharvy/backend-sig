const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
// ######
const trucksDb = query({
    connects,
    models,
});
// ######

module.exports = trucksDb;