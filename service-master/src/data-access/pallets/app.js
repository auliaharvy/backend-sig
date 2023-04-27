const {
    connects
} = require("../app");
const models = require("../sequelize/models");
// ######
const query = require("./query");
const bcrypt = require('bcrypt');
// ######
const palletsDB = query({
    connects,
    models,
    bcrypt
});
// ######

module.exports = palletsDB;