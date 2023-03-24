  // #########
  const create = require("./create");
  const getToken = require("./getToken");
  const models = require('../../data-access/sequelize/models');
  // #########
  const services = Object.freeze({
    create,
    getToken,
  });
  
  module.exports = services;
  module.exports = {
    create,
    getToken,
  };