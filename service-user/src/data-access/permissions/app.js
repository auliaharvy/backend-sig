const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
const bcrypt = require('bcrypt');
// ######
const permissionsDB = query({
    connects,
    models,
    bcrypt
});
// ######

module.exports = permissionsDB;