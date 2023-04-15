const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
const bcrypt = require('bcrypt');
// ######
const companytTypesDB = query({
    connects,
    models,
    bcrypt
});
// ######

module.exports = companytTypesDB;