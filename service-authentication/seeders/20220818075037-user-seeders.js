'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe 2',
        profession: 'Admin Finance 2',
        role: 'admin',
        email: 'johndoe2@mail.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Karim',
        profession: 'Admin IT',
        role: 'admin',
        email: 'karim@mail.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      
      
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
