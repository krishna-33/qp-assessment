'use strict';

const { timeStamp } = require('console');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
       "orders",
       {
         id: {
           type: Sequelize.INTEGER,
           primaryKey: true,
           autoIncrement: true,
         },
         items: {
           type: Sequelize.JSON,
           allowNull: false,
         },
         createdAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
         },
         updatedAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
         },
       },
       {
         timeStamp: true,
       }
     );
     
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('orders');
  
  }
};
