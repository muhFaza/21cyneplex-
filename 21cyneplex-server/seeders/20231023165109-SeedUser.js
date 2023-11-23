'use strict';

const Helper = require('../helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const user = [
      {
        username: 'faza',
        email: 'faza@gmail.com',
        password: 'pass123'
      },
      {
        username: 'mondi',
        email: 'mondi@gmail.com',
        password: 'pass123'
      }
    ].map(el => {
      el.password = Helper.hashPassword(el.password)
      el.JWTkey = Helper.generateOTP()
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Users', user, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
