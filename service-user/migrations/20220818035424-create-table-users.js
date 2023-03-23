'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin', 'student'],
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });

    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['email'],
      name: 'UNIQUE_USERS_EMAIL'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
