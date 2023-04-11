const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
const bcrypt = require('bcrypt');
// ######
const rolesDB = query({
    connects,
    models,
    bcrypt
});
// ######

module.exports = rolesDB;